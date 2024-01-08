const {
  createEvent,
  getFilteredEvents,
  getEventsByUser,
  getEventsById,
  updateEvent,
  removeEvent,
  getLatestEvents,
} = require('../models/event/event.model');
const { getUserById } = require('../models/user/user.model');
const User = require('../models/user/user.mongo');
const {
  createNotification,
} = require('../models/notification/notification.model');
const socket = require('../services/socket');

/* 
?@desc   Create a new event
*@route  POST /api/events
*@access Private
*/
const createNewEvent = async (req, res) => {
  try {
    const { body } = req;
    const event = await createEvent({ ...body }, body.createdBy);
    res.status(200).json({ event, message: 'Event created successfully' });
  } catch (error) {
    console.error('Failed to create event:', error);

    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
};

/* 
?@desc   Get all events
*@route  GET /api/events
*@access Private
*/

const getAllEvents = async (req, res) => {
  try {
    const {
      eventType,
      eventCategory,
      eventSubCategory,
      priceRange,
      audienceSize,
      page,
      pageSize,
      sortOption,
    } = req.query;

    const filters = {};
    if (eventType) filters.eventType = eventType;
    if (eventCategory) filters.eventCategory = eventCategory;
    if (priceRange) filters.eventBudget = priceRange;
    if (eventSubCategory) filters.eventSubCategory = eventSubCategory;
    if (audienceSize) filters.audienceSize = audienceSize;

    const { events, totalCount } = await getFilteredEvents(
      filters,
      page,
      pageSize,
      sortOption
    );

    res.status(200).json({ events, totalCount });
  } catch (error) {
    console.error('Failed to fetch events - ', error.message);

    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
};

/* 
?@desc   Get event by user ID
*@route  GET /api/events/user/:userId
*@access Private
*/

const getUserEvents = async (req, res) => {
  try {
    const { userId } = req.params;
    const { sort } = req.query;
    const events = await getEventsByUser(userId, req, sort);
    res.status(200).json(events);
  } catch (error) {
    console.error('Failed to user events - ', error.message);

    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
};

/* 
?@desc   Get event by ID
*@route  GET /api/events/:id
*@access Private
*/

const getEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await getEventsById(id, req);
    res.status(200).json(event);
  } catch (error) {
    console.error('Failed to event - ', error.message);

    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
};

/* 
?@desc   Update event
*@route  PUT /api/events/:id
*@access Private
*/

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const eventDetails = { ...req.body };

    const event = await updateEvent(id, eventDetails);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Notify users who have saved the event
    const savedEventUsers = await User.find({ savedEvents: id });
    console.log(savedEventUsers);

    // Update savedEventAlerts for each user
    for (const user of savedEventUsers) {
      // Emit socket event
      if (socket) {
        socket.emit('eventUpdated', {
          userId: user._id,
          eventId: id,
          message: 'An Event you saved has been updated',
        });
      } else {
        console.log('socket error');
      }

      // Check if the event is already in savedEventAlerts
      const isEventAlreadySaved = user.savedEventAlerts.includes(id);

      // If not, add it to savedEventAlerts
      if (!isEventAlreadySaved) {
        user.savedEventAlerts.push(id);
        await user.save();
      }

      // Persist the notification
      const notification = {
        message: 'An Event you saved has been updated',
        type: 'event-update',
        userId: user._id,
      };
      await createNotification(notification);
    }

    res.status(200).json({ event, message: 'Event successfully updated' });
  } catch (error) {
    console.error('Failed to update event:', error);

    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
};

/* 
?@desc   Get saved events by user
*@route  Get /api/events/saved:id
*@access Private
*/

const getSavedEventsByUser = async (req, res) => {
  const { userId } = req.params;

  try {
    // Find the user by ID and populate the savedEvents field
    const user = await getUserById({ _id: userId }).populate('savedEvents');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const savedEvents = user.savedEvents;

    // You now have the saved events for the user
    res.status(200).json(savedEvents);
  } catch (error) {
    console.error('Failed to fetch saved events of user - ', error.message);

    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
};

/* 
?@desc   Remove event
*@route  DELETE /api/events/:id
*@access Private
*/
const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedEvent = await removeEvent(id);
    res.status(200).json(deletedEvent);
  } catch (error) {
    console.error('Failed to remove event - ', error.message);

    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
};

/* 
?@desc   Save event
*@route  POST /api/events/save/:eventId
*@access Private
*/
const saveEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    console.log(eventId);
    const { _id } = req.user;

    const user = await getUserById(_id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const event = await getEventsById(eventId, req);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    const isEventAlreadySaved = user.savedEvents.some((savedEventId) =>
      savedEventId.equals(event._id)
    );

    if (isEventAlreadySaved) {
      return res.status(400).json({ error: 'Event already saved' });
    }

    // Save the event to the user's savedEvents array
    user.savedEvents.push(eventId);
    await user.save();

    res.status(200).json({ message: 'Event saved successfully', user, event });
  } catch (error) {
    console.error('Failed to save event - ', error.message);
  }
};

/* 
?@desc   Get latest events
*@route  GET /api/events/recent
*@access Public
*/

const getRecentEvents = async (req, res) => {
  try {
    const events = await getLatestEvents();
    res.status(200).json(events);
  } catch (error) {
    console.error('Failed to event - ', error.message);
  }
};

/* 
?@desc   Get event alerts by user
*@route  Get /api/events/alerts/user/:userId
*@access Private
*/

const getEventAlertsByUser = async (req, res) => {
  const { userId } = req.params;

  try {
    // Find the user by ID and populate the savedEvents field
    const user = await getUserById({ _id: userId }).populate(
      'savedEventAlerts'
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const eventAlerts = user.savedEventAlerts;

    res.status(200).json(eventAlerts);
  } catch (error) {
    console.error('Failed to fetch event alerts of user - ', error.message);

    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
};

/* 
?@desc   Remove event alert from user
*@route  DELETE /api/events/alerts/user/:userId/:eventId
*@access Private
*/
const removeEventAlert = async (req, res) => {
  try {
    const { userId, eventId } = req.params;

    // Find the user by ID
    const user = await getUserById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the event is in the user's savedEventAlerts
    const isEventInSavedEventAlerts = user.savedEventAlerts.includes(eventId);

    if (!isEventInSavedEventAlerts) {
      return res
        .status(400)
        .json({ message: 'Event alert not found for the user' });
    }

    // Remove the event from savedEventAlerts
    user.savedEventAlerts = user.savedEventAlerts.filter(
      (savedEventId) => !savedEventId.equals(eventId)
    );

    await user.save();

    res.status(200).json({ message: 'Event alert removed successfully', user });
  } catch (error) {
    console.error('Failed to remove event alert - ', error.message);

    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
};

module.exports = {
  createNewEvent,
  getAllEvents,
  getUserEvents,
  getEvent,
  update,
  remove,
  saveEvent,
  getRecentEvents,
  getSavedEventsByUser,
  getEventAlertsByUser,
  removeEventAlert,
};
