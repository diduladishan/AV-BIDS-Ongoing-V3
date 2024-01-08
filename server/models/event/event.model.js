const Event = require('./event.mongo');
const User = require('../user/user.mongo');

// const createEvent = async (values, userId) => {
//   try {
//     // Create a new event with the provided values
//     const newEvent = await new Event(values).save();

//     // Find the user by ID
//     const user = await User.findById(userId);

//     // If the user is found, update the events array with the new event's ID
//     if (user) {
//       user.events.push(newEvent._id);
//       await user.save();
//     }

//     // Return the new event
//     return newEvent.toObject();
//   } catch (error) {
//     // Handle any errors that might occur during the process
//     console.error('Failed to create event - ', error.message);
//     throw new Error('Internal Server Error');
//   }
// };

const createEvent = async (updates, userId) => {
  const getUpdatedValue = (field, category) =>
    updates[field] !== undefined ? updates[field] : updates[category]?.[field];

  const updateMicrophones = {
    wiredHandheld: getUpdatedValue('wiredHandheld', 'microphones'),
    wirelessHandheld: getUpdatedValue('wirelessHandheld', 'microphones'),
    wirelessLavalier: getUpdatedValue('wirelessLavalier', 'microphones'),
    headsetMicrophone: getUpdatedValue('headsetMicrophone', 'microphones'),
    earsetMicrophone: getUpdatedValue('earsetMicrophone', 'microphones'),
    gooseneckMicrophone: getUpdatedValue('gooseneckMicrophone', 'microphones'),
    boundaryMicrophone: getUpdatedValue('boundaryMicrophone', 'microphones'),
    audienceMicrophone: getUpdatedValue('audienceMicrophone', 'microphones'),
  };

  const updateSpeakers = {
    speakers_8_15: getUpdatedValue('speakers_8_15', 'speakers'),
    line_array_speaker_system: getUpdatedValue(
      'line_array_speaker_system',
      'speakers'
    ),
    subwoofer_12_18: getUpdatedValue('subwoofer_12_18', 'speakers'),
    reference_speaker_monitors: getUpdatedValue(
      'reference_speaker_monitors',
      'speakers'
    ),
    bluetooth_speaker_small: getUpdatedValue(
      'bluetooth_speaker_small',
      'speakers'
    ),
    bluetooth_speaker_large: getUpdatedValue(
      'bluetooth_speaker_large',
      'speakers'
    ),
    computer_audio_speaker_system: getUpdatedValue(
      'computer_audio_speaker_system',
      'speakers'
    ),
    audio_rigging_and_truss: getUpdatedValue(
      'audio_rigging_and_truss',
      'speakers'
    ),
  };

  const updateMixers = {
    analog_mixer: getUpdatedValue('analog_mixer', 'mixers'),
    digital_mixer: getUpdatedValue('digital_mixer', 'mixers'),
    computer_audio_interface: getUpdatedValue(
      'computer_audio_interface',
      'mixers'
    ),
    multi_media_DI_box: getUpdatedValue('multi_media_DI_box', 'mixers'),
    broadcast_phone_line_interface: getUpdatedValue(
      'broadcast_phone_line_interface',
      'mixers'
    ),
    digital_audio_recording: getUpdatedValue(
      'digital_audio_recording',
      'mixers'
    ),
    audio_playback_instant_replay: getUpdatedValue(
      'audio_playback_instant_replay',
      'mixers'
    ),
    cd_player: getUpdatedValue('cd_player', 'mixers'),
    audio_processing: getUpdatedValue('audio_processing', 'mixers'),
  };

  const updateCommunication = {
    wireless_belt_pack_and_headset: getUpdatedValue(
      'wireless_belt_pack_and_headset',
      'communication'
    ),
    wired_belt_pack_and_headset: getUpdatedValue(
      'wired_belt_pack_and_headset',
      'communication'
    ),
  };

  const updateScreens = {
    Twenty_One_Nine_Large_Format_Screen: getUpdatedValue(
      'Twenty_One_Nine_Large_Format_Screen',
      'screens'
    ),
    Fast_Fold_Screen_16_9_Format_Large_Venue: getUpdatedValue(
      'Fast_Fold_Screen_16_9_Format_Large_Venue',
      'screens'
    ),
    Fast_Fold_Screen_16_9_Format_Medium_Venue: getUpdatedValue(
      'Fast_Fold_Screen_16_9_Format_Medium_Venue',
      'screens'
    ),
    Fast_Fold_Screen_16_9_Format_Meeting_Room: getUpdatedValue(
      'Fast_Fold_Screen_16_9_Format_Meeting_Room',
      'screens'
    ),
    Fast_Fold_Screen_4_3_Format_Large_Venue: getUpdatedValue(
      'Fast_Fold_Screen_4_3_Format_Large_Venue',
      'screens'
    ),
    Fast_Fold_Screen_4_3_Format_Medium_Venue: getUpdatedValue(
      'Fast_Fold_Screen_4_3_Format_Medium_Venue',
      'screens'
    ),
    Fast_Fold_Screen_4_3_Format_Meeting_Room: getUpdatedValue(
      'Fast_Fold_Screen_4_3_Format_Meeting_Room',
      'screens'
    ),
    Fast_Fold_Drape_Kit: getUpdatedValue('Fast_Fold_Drape_Kit', 'screens'),
    Tripod_Screens_60_96: getUpdatedValue('Tripod_Screens_60_96', 'screens'),
    LCD_Monitor: getUpdatedValue('LCD_Monitor', 'screens'),
    Video_LED_Wall: getUpdatedValue('Video_LED_Wall', 'screens'),
    Screen_Rigging_and_Truss: getUpdatedValue(
      'Screen_Rigging_and_Truss',
      'screens'
    ),
  };

  const updateProjection = {
    Twenty_One_Nine_Format_Projection: getUpdatedValue(
      'Twenty_One_Nine_Format_Projection',
      'projection'
    ),
    Large_Venue_Projector_Standard_Throw_Lens: getUpdatedValue(
      'Large_Venue_Projector_Standard_Throw_Lens',
      'projection'
    ),
    Large_Venue_Projector_Long_Throw_Lens: getUpdatedValue(
      'Large_Venue_Projector_Long_Throw_Lens',
      'projection'
    ),
    Large_Venue_Projector_Short_Throw_Lens: getUpdatedValue(
      'Large_Venue_Projector_Short_Throw_Lens',
      'projection'
    ),
    Medium_Venue_Projector_Standard_Throw_Lens: getUpdatedValue(
      'Medium_Venue_Projector_Standard_Throw_Lens',
      'projection'
    ),
    Medium_Venue_Projector_Long_Throw_Lens: getUpdatedValue(
      'Medium_Venue_Projector_Long_Throw_Lens',
      'projection'
    ),
    Medium_Venue_Projector_Short_Throw_Lens: getUpdatedValue(
      'Medium_Venue_Projector_Short_Throw_Lens',
      'projection'
    ),
    Meeting_Room_Projector: getUpdatedValue(
      'Meeting_Room_Projector',
      'projection'
    ),
    Projector_Rigging_and_Truss: getUpdatedValue(
      'Projector_Rigging_and_Truss',
      'projection'
    ),
  };

  const updateVideoCamera = {
    Broadcast_Camera: getUpdatedValue('Broadcast_Camera', 'videoCamera'),
    Roaming_Camera: getUpdatedValue('Roaming_Camera', 'videoCamera'),
    Camcorder: getUpdatedValue('Camcorder', 'videoCamera'),
    Video_and_Camera_Lighting: getUpdatedValue(
      'Video_and_Camera_Lighting',
      'videoCamera'
    ),
    Photography_Camera: getUpdatedValue('Photography_Camera', 'videoCamera'),
  };

  const updateVideoProcessing = {
    Video_Switching_and_Effects_Processing: getUpdatedValue(
      'Video_Switching_and_Effects_Processing',
      'videoProcessing'
    ),
    Video_Capture: getUpdatedValue('Video_Capture', 'videoProcessing'),
    Screen_Blend_21_Nine_Format: getUpdatedValue(
      'Screen_Blend_21_Nine_Format',
      'videoProcessing'
    ),
    Video_Streaming: getUpdatedValue('Video_Streaming', 'videoProcessing'),
    DVD_Blu_Ray_Player: getUpdatedValue(
      'DVD_Blu_Ray_Player',
      'videoProcessing'
    ),
    VHS_DVD_Player: getUpdatedValue('VHS_DVD_Player', 'videoProcessing'),
  };

  const updatePresenterTools = {
    Speaker_Timer: getUpdatedValue('Speaker_Timer', 'presenterTools'),
    Presentation_Remote_Clicker: getUpdatedValue(
      'Presentation_Remote_Clicker',
      'presenterTools'
    ),
    Laser_Pointer: getUpdatedValue('Laser_Pointer', 'presenterTools'),
    Perfect_Cue_System: getUpdatedValue('Perfect_Cue_System', 'presenterTools'),
    Flipchart: getUpdatedValue('Flipchart', 'presenterTools'),
  };

  const updateLighting = {
    Uplighting: getUpdatedValue('Uplighting', 'lighting'),
    Stage_Wash: getUpdatedValue('Stage_Wash', 'lighting'),
    Moving_Head_Lights: getUpdatedValue('Moving_Head_Lights', 'lighting'),
    Gobo: getUpdatedValue('Gobo', 'lighting'),
    Inflatable_Balloon_Light: getUpdatedValue(
      'Inflatable_Balloon_Light',
      'lighting'
    ),
    LED_Lighting_Effects: getUpdatedValue('LED_Lighting_Effects', 'lighting'),
    Spotlight: getUpdatedValue('Spotlight', 'lighting'),
    Lighting_Rigging_and_Truss: getUpdatedValue(
      'Lighting_Rigging_and_Truss',
      'lighting'
    ),
  };

  const updateScenic = {
    Drape_Kit_Black: getUpdatedValue('Drape_Kit_Black', 'scenic'),
    Drape_Kit_Grey: getUpdatedValue('Drape_Kit_Grey', 'scenic'),
    Drape_Kit_White: getUpdatedValue('Drape_Kit_White', 'scenic'),
    Scenic_Panels: getUpdatedValue('Scenic_Panels', 'scenic'),
    Podium: getUpdatedValue('Podium', 'scenic'),
    Mobile_Hotspot_up_to_15_devices: getUpdatedValue(
      'Mobile_Hotspot_up_to_15_devices',
      'scenic'
    ),
    Event_WIFI_Network_more_than_15_devices: getUpdatedValue(
      'Event_WIFI_Network_more_than_15_devices',
      'scenic'
    ),
    Laptops_PC: getUpdatedValue('Laptops_PC', 'scenic'),
    Laptops_Mac: getUpdatedValue('Laptops_Mac', 'scenic'),
  };

  const updateElectrical = {
    Audience_Table_Power: getUpdatedValue('Audience_Table_Power', 'electrical'),
    Power_Strips_6x1: getUpdatedValue('Power_Strips_6x1', 'electrical'),
    Portable_Distribution_Box_50_Amp: getUpdatedValue(
      'Portable_Distribution_Box_50_Amp',
      'electrical'
    ),
    Portable_Distribution_Box_100_Amp: getUpdatedValue(
      'Portable_Distribution_Box_100_Amp',
      'electrical'
    ),
    Portable_Distribution_Box_200_Amp: getUpdatedValue(
      'Portable_Distribution_Box_200_Amp',
      'electrical'
    ),
    Portable_Distribution_Box_300_Amp: getUpdatedValue(
      'Portable_Distribution_Box_300_Amp',
      'electrical'
    ),
    Portable_Distribution_Box_400_Amp: getUpdatedValue(
      'Portable_Distribution_Box_400_Amp',
      'electrical'
    ),
  };

  const updateStaff = {
    Audio_Tech: getUpdatedValue('Audio_Tech', 'staff'),
    Video_Tech: getUpdatedValue('Video_Tech', 'staff'),
    Lighting_Tech: getUpdatedValue('Lighting_Tech', 'staff'),
    Project_Manager: getUpdatedValue('Project_Manager', 'staff'),
  };

  const newEvent = await Event.create({
    ...updates,
    microphones: { ...updateMicrophones },
    speakers: { ...updateSpeakers },
    mixers: { ...updateMixers },
    communication: { ...updateCommunication },
    screens: { ...updateScreens },
    projection: { ...updateProjection },
    videoCamera: { ...updateVideoCamera },
    videoProcessing: { ...updateVideoProcessing },
    presenterTools: { ...updatePresenterTools },
    lighting: { ...updateLighting },
    scenic: { ...updateScenic },
    electrical: { ...updateElectrical },
    staff: { ...updateStaff },
  });

  const user = await User.findById(userId);

  // If the user is found, update the events array with the new event's ID
  if (user) {
    user.events.push(newEvent._id);
    await user.save();
  }

  return newEvent;
};

const getFilteredEvents = async (filters, page, pageSize, sortOption) => {
  try {
    const skip = (page - 1) * pageSize;
    let sorting = { createdAt: -1 };

    if (sortOption) {
      switch (sortOption) {
        case 'ending_soonest':
          sorting = { proposalDueDate: 1 };
          break;
        case 'budget_lowest':
          sorting = { eventBudget: -1 };
          break;
        case 'budget_highest':
          sorting = { eventBudget: 1 };
          break;
        case 'audience_size_lowest':
          sorting = { audienceSize: 1 };
          break;
        case 'audience_size_highest':
          sorting = { audienceSize: -1 };
          break;
      }
    }

    const totalCount = await Event.countDocuments({
      ...filters,
      status: { $ne: 'Draft', $ne: 'Expired' },
    });

    const events = await Event.find({
      ...filters,
      $and: [{ status: { $ne: 'Draft' } }, { status: { $ne: 'Expired' } }],
    })
      .sort(sorting)
      .skip(skip)
      .limit(parseInt(pageSize))
      .lean()
      .exec();

    return { events, totalCount };
  } catch (error) {
    console.error('Error in getFilteredEvents:', error.message);
    throw error;
  }
};

const getEventsByUser = async (userId, req, sortOption) => {
  try {
    let query = Event.find({ createdBy: userId });

    const sortFields = {
      date_posted: 'createdAt',
      expiring_soonest: 'eventEndDate',
      active: 'status',
    };

    const sortField = sortFields[sortOption];
    if (sortField) {
      query = query.sort({
        [sortField]: sortOption === 'date_posted' ? 'desc' : 'asc',
      });
    }

    if (sortOption === 'active') {
      query = query.where('status').equals('Active');
    }

    const events = await query.exec();
    return events;
  } catch (error) {
    console.error('Error fetching events:', error.message);
    throw error;
  }
};

const getEventsById = (id, req) => Event.findById({ _id: id });
// .cache({ key: req.user.id });

// const updateEvent = (id, updates) => {
//   return Event.findOneAndUpdate({ _id: id }, updates, {
//     new: true,
//     upsert: true,
//   });
// };

const updateEvent = (id, updates) => {
  const getUpdatedValue = (field, category) =>
    updates[field] !== undefined ? updates[field] : updates[category]?.[field];

  const updateMicrophones = {
    wiredHandheld: getUpdatedValue('wiredHandheld', 'microphones'),
    wirelessHandheld: getUpdatedValue('wirelessHandheld', 'microphones'),
    wirelessLavalier: getUpdatedValue('wirelessLavalier', 'microphones'),
    headsetMicrophone: getUpdatedValue('headsetMicrophone', 'microphones'),
    earsetMicrophone: getUpdatedValue('earsetMicrophone', 'microphones'),
    gooseneckMicrophone: getUpdatedValue('gooseneckMicrophone', 'microphones'),
    boundaryMicrophone: getUpdatedValue('boundaryMicrophone', 'microphones'),
    audienceMicrophone: getUpdatedValue('audienceMicrophone', 'microphones'),
  };

  const updateSpeakers = {
    speakers_8_15: getUpdatedValue('speakers_8_15', 'speakers'),
    line_array_speaker_system: getUpdatedValue(
      'line_array_speaker_system',
      'speakers'
    ),
    subwoofer_12_18: getUpdatedValue('subwoofer_12_18', 'speakers'),
    reference_speaker_monitors: getUpdatedValue(
      'reference_speaker_monitors',
      'speakers'
    ),
    bluetooth_speaker_small: getUpdatedValue(
      'bluetooth_speaker_small',
      'speakers'
    ),
    bluetooth_speaker_large: getUpdatedValue(
      'bluetooth_speaker_large',
      'speakers'
    ),
    computer_audio_speaker_system: getUpdatedValue(
      'computer_audio_speaker_system',
      'speakers'
    ),
    audio_rigging_and_truss: getUpdatedValue(
      'audio_rigging_and_truss',
      'speakers'
    ),
  };

  const updateMixers = {
    analog_mixer: getUpdatedValue('analog_mixer', 'mixers'),
    digital_mixer: getUpdatedValue('digital_mixer', 'mixers'),
    computer_audio_interface: getUpdatedValue(
      'computer_audio_interface',
      'mixers'
    ),
    multi_media_DI_box: getUpdatedValue('multi_media_DI_box', 'mixers'),
    broadcast_phone_line_interface: getUpdatedValue(
      'broadcast_phone_line_interface',
      'mixers'
    ),
    digital_audio_recording: getUpdatedValue(
      'digital_audio_recording',
      'mixers'
    ),
    audio_playback_instant_replay: getUpdatedValue(
      'audio_playback_instant_replay',
      'mixers'
    ),
    cd_player: getUpdatedValue('cd_player', 'mixers'),
    audio_processing: getUpdatedValue('audio_processing', 'mixers'),
  };

  const updateCommunication = {
    wireless_belt_pack_and_headset: getUpdatedValue(
      'wireless_belt_pack_and_headset',
      'communication'
    ),
    wired_belt_pack_and_headset: getUpdatedValue(
      'wired_belt_pack_and_headset',
      'communication'
    ),
  };

  const updateScreens = {
    Twenty_One_Nine_Large_Format_Screen: getUpdatedValue(
      'Twenty_One_Nine_Large_Format_Screen',
      'screens'
    ),
    Fast_Fold_Screen_16_9_Format_Large_Venue: getUpdatedValue(
      'Fast_Fold_Screen_16_9_Format_Large_Venue',
      'screens'
    ),
    Fast_Fold_Screen_16_9_Format_Medium_Venue: getUpdatedValue(
      'Fast_Fold_Screen_16_9_Format_Medium_Venue',
      'screens'
    ),
    Fast_Fold_Screen_16_9_Format_Meeting_Room: getUpdatedValue(
      'Fast_Fold_Screen_16_9_Format_Meeting_Room',
      'screens'
    ),
    Fast_Fold_Screen_4_3_Format_Large_Venue: getUpdatedValue(
      'Fast_Fold_Screen_4_3_Format_Large_Venue',
      'screens'
    ),
    Fast_Fold_Screen_4_3_Format_Medium_Venue: getUpdatedValue(
      'Fast_Fold_Screen_4_3_Format_Medium_Venue',
      'screens'
    ),
    Fast_Fold_Screen_4_3_Format_Meeting_Room: getUpdatedValue(
      'Fast_Fold_Screen_4_3_Format_Meeting_Room',
      'screens'
    ),
    Fast_Fold_Drape_Kit: getUpdatedValue('Fast_Fold_Drape_Kit', 'screens'),
    Tripod_Screens_60_96: getUpdatedValue('Tripod_Screens_60_96', 'screens'),
    LCD_Monitor: getUpdatedValue('LCD_Monitor', 'screens'),
    Video_LED_Wall: getUpdatedValue('Video_LED_Wall', 'screens'),
    Screen_Rigging_and_Truss: getUpdatedValue(
      'Screen_Rigging_and_Truss',
      'screens'
    ),
  };

  const updateProjection = {
    Twenty_One_Nine_Format_Projection: getUpdatedValue(
      'Twenty_One_Nine_Format_Projection',
      'projection'
    ),
    Large_Venue_Projector_Standard_Throw_Lens: getUpdatedValue(
      'Large_Venue_Projector_Standard_Throw_Lens',
      'projection'
    ),
    Large_Venue_Projector_Long_Throw_Lens: getUpdatedValue(
      'Large_Venue_Projector_Long_Throw_Lens',
      'projection'
    ),
    Large_Venue_Projector_Short_Throw_Lens: getUpdatedValue(
      'Large_Venue_Projector_Short_Throw_Lens',
      'projection'
    ),
    Medium_Venue_Projector_Standard_Throw_Lens: getUpdatedValue(
      'Medium_Venue_Projector_Standard_Throw_Lens',
      'projection'
    ),
    Medium_Venue_Projector_Long_Throw_Lens: getUpdatedValue(
      'Medium_Venue_Projector_Long_Throw_Lens',
      'projection'
    ),
    Medium_Venue_Projector_Short_Throw_Lens: getUpdatedValue(
      'Medium_Venue_Projector_Short_Throw_Lens',
      'projection'
    ),
    Meeting_Room_Projector: getUpdatedValue(
      'Meeting_Room_Projector',
      'projection'
    ),
    Projector_Rigging_and_Truss: getUpdatedValue(
      'Projector_Rigging_and_Truss',
      'projection'
    ),
  };

  const updateVideoCamera = {
    Broadcast_Camera: getUpdatedValue('Broadcast_Camera', 'videoCamera'),
    Roaming_Camera: getUpdatedValue('Roaming_Camera', 'videoCamera'),
    Camcorder: getUpdatedValue('Camcorder', 'videoCamera'),
    Video_and_Camera_Lighting: getUpdatedValue(
      'Video_and_Camera_Lighting',
      'videoCamera'
    ),
    Photography_Camera: getUpdatedValue('Photography_Camera', 'videoCamera'),
  };

  const updateVideoProcessing = {
    Video_Switching_and_Effects_Processing: getUpdatedValue(
      'Video_Switching_and_Effects_Processing',
      'videoProcessing'
    ),
    Video_Capture: getUpdatedValue('Video_Capture', 'videoProcessing'),
    Screen_Blend_21_Nine_Format: getUpdatedValue(
      'Screen_Blend_21_Nine_Format',
      'videoProcessing'
    ),
    Video_Streaming: getUpdatedValue('Video_Streaming', 'videoProcessing'),
    DVD_Blu_Ray_Player: getUpdatedValue(
      'DVD_Blu_Ray_Player',
      'videoProcessing'
    ),
    VHS_DVD_Player: getUpdatedValue('VHS_DVD_Player', 'videoProcessing'),
  };

  const updatePresenterTools = {
    Speaker_Timer: getUpdatedValue('Speaker_Timer', 'presenterTools'),
    Presentation_Remote_Clicker: getUpdatedValue(
      'Presentation_Remote_Clicker',
      'presenterTools'
    ),
    Laser_Pointer: getUpdatedValue('Laser_Pointer', 'presenterTools'),
    Perfect_Cue_System: getUpdatedValue('Perfect_Cue_System', 'presenterTools'),
    Flipchart: getUpdatedValue('Flipchart', 'presenterTools'),
  };

  const updateLighting = {
    Uplighting: getUpdatedValue('Uplighting', 'lighting'),
    Stage_Wash: getUpdatedValue('Stage_Wash', 'lighting'),
    Moving_Head_Lights: getUpdatedValue('Moving_Head_Lights', 'lighting'),
    Gobo: getUpdatedValue('Gobo', 'lighting'),
    Inflatable_Balloon_Light: getUpdatedValue(
      'Inflatable_Balloon_Light',
      'lighting'
    ),
    LED_Lighting_Effects: getUpdatedValue('LED_Lighting_Effects', 'lighting'),
    Spotlight: getUpdatedValue('Spotlight', 'lighting'),
    Lighting_Rigging_and_Truss: getUpdatedValue(
      'Lighting_Rigging_and_Truss',
      'lighting'
    ),
  };

  const updateScenic = {
    Drape_Kit_Black: getUpdatedValue('Drape_Kit_Black', 'scenic'),
    Drape_Kit_Grey: getUpdatedValue('Drape_Kit_Grey', 'scenic'),
    Drape_Kit_White: getUpdatedValue('Drape_Kit_White', 'scenic'),
    Scenic_Panels: getUpdatedValue('Scenic_Panels', 'scenic'),
    Podium: getUpdatedValue('Podium', 'scenic'),
    Mobile_Hotspot_up_to_15_devices: getUpdatedValue(
      'Mobile_Hotspot_up_to_15_devices',
      'scenic'
    ),
    Event_WIFI_Network_more_than_15_devices: getUpdatedValue(
      'Event_WIFI_Network_more_than_15_devices',
      'scenic'
    ),
    Laptops_PC: getUpdatedValue('Laptops_PC', 'scenic'),
    Laptops_Mac: getUpdatedValue('Laptops_Mac', 'scenic'),
  };

  const updateElectrical = {
    Audience_Table_Power: getUpdatedValue('Audience_Table_Power', 'electrical'),
    Power_Strips_6x1: getUpdatedValue('Power_Strips_6x1', 'electrical'),
    Portable_Distribution_Box_50_Amp: getUpdatedValue(
      'Portable_Distribution_Box_50_Amp',
      'electrical'
    ),
    Portable_Distribution_Box_100_Amp: getUpdatedValue(
      'Portable_Distribution_Box_100_Amp',
      'electrical'
    ),
    Portable_Distribution_Box_200_Amp: getUpdatedValue(
      'Portable_Distribution_Box_200_Amp',
      'electrical'
    ),
    Portable_Distribution_Box_300_Amp: getUpdatedValue(
      'Portable_Distribution_Box_300_Amp',
      'electrical'
    ),
    Portable_Distribution_Box_400_Amp: getUpdatedValue(
      'Portable_Distribution_Box_400_Amp',
      'electrical'
    ),
  };

  const updateStaff = {
    Audio_Tech: getUpdatedValue('Audio_Tech', 'staff'),
    Video_Tech: getUpdatedValue('Video_Tech', 'staff'),
    Lighting_Tech: getUpdatedValue('Lighting_Tech', 'staff'),
    Project_Manager: getUpdatedValue('Project_Manager', 'staff'),
  };

  return Event.findOneAndUpdate(
    { _id: id },
    {
      ...updates,
      microphones: { ...updateMicrophones },
      speakers: { ...updateSpeakers },
      mixers: { ...updateMixers },
      communication: { ...updateCommunication },
      screens: { ...updateScreens },
      projection: { ...updateProjection },
      videoCamera: { ...updateVideoCamera },
      videoProcessing: { ...updateVideoProcessing },
      presenterTools: { ...updatePresenterTools },
      lighting: { ...updateLighting },
      scenic: { ...updateScenic },
      electrical: { ...updateElectrical },
      staff: { ...updateStaff },
    },
    {
      new: true,
      upsert: true,
    }
  );
};

const removeEvent = (id) => {
  return Event.findByIdAndRemove(
    { _id: id },
    {
      new: true,
      upsert: true,
    }
  );
};

const getLatestEvents = async () => {
  return Event.find({
    status: { $ne: 'Draft' },
  })
    .sort({ createdAt: -1 })
    .limit(6);
};

module.exports = {
  createEvent,
  getFilteredEvents,
  getEventsByUser,
  getEventsById,
  updateEvent,
  removeEvent,
  getLatestEvents,
};
