import { Option, Select } from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Event } from '../../types';
import api from '../../utils/api';
import EventListingCard from './components/eventListingCard';
import Sidebar from './components/sidebar';

export function Index() {
  const navigate = useNavigate();
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAllEvents = async () => {
      try {
        setLoading(true);
        const { data } = await api.get('/events');
        setEvents(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchAllEvents();
  }, []);

  useEffect(() => {
    // Initialize filtered events with all events on initial load
    setFilteredEvents(events);
  }, [events]);


  if (loading) return <p>Loading...</p>;
  return (
    <div>
      <div>
        <h2 className='text-center text-primary mb-16'>Event Listings</h2>
      </div>

      <div className='flex justify-center gap-8'>
        <Sidebar />

        <div>
          <div className='flex items-center justify-between mb-6 mx-4'>
            <p className='text-[14px]'>{events.length} events Found</p>

            <div className='w-[200px] '>
              <Select label='Sort: Ending Soonest '>
                <Option>Ending Soonest</Option>
                <Option>Budget Lowest</Option>
                <Option>Budget Highest</Option>
                <Option>Audience Size Lowest</Option>
                <Option>Audience Size Highest</Option>
              </Select>
            </div>
          </div>
          {filteredEvents?.map((event) => (
            <div
              key={event._id}
              className='hover:cursor-pointer'
              onClick={() => navigate(`/events/${event._id}`)}
            >
              <EventListingCard event={event} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Index;
