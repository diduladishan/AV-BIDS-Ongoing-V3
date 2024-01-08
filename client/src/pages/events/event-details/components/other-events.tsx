import { Button, Spinner } from "@material-tailwind/react";
import { FC } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EVENTDETAILS_03 from "../../../../assets/13_event_details_page/Rectangle 3759.png";
import EVENTDETAILS_04 from "../../../../assets/13_event_details_page/location.png";
import { Event } from "../../../../types";
import LazyLoad from 'react-lazy-load';

interface OtherEventsProps {
  events: Event[];
  loading: boolean;
}

const OtherEvents: FC<OtherEventsProps> = ({ events, loading }) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const filteredEvents = events.filter((event) => event._id !== id);
  const limitedEvents = filteredEvents.slice(0, 3);

  return (
    <div className='text-center sm:text-left'>
      {loading ? (
        <div className='flex items-center justify-center h-full'>
          <Spinner />
        </div>
      ) : (
        <>
          <h2 className='text-[20px] mb-4'>Other events by this client</h2>

          {limitedEvents.length > 0 ? (
            limitedEvents?.map((event) => (
              <div key={event._id} className='mb-6 '>
                <div
                  className='sm:flex items-center bg-[#f3f1fb] gap-8 p-3 rounded-lg hover:cursor-pointer'
                  onClick={() => {
                    navigate(`/events/${event._id}`);
                    window.location.reload();
                  }}
                >
                  <div className='flex justify-center sm:justify-left'>
                    <LazyLoad height={150} threshold={0.99}>
                      <img
                        src={
                          event?.thumbnail[0]?.url
                            ? `https://av-bids-bucket.s3.ap-south-1.amazonaws.com/${event?.thumbnail[0]?.url}`
                            : EVENTDETAILS_03
                        }
                        alt='Event Poster'
                        className='rounded-lg h-[150px] w-full md:min-w-[230px] md:max-w-[230px] object-cover'
                      />
                    </LazyLoad>
                  </div>

                  <div>
                    <h2 className='text-[20px]'>{event.title}</h2>

                    <div className='sm:flex gap-36'>
                      <div className='sm:flex gap-2'>
                        <p className='text-[16px] sm:text-[18px]'>
                          Event Date:
                        </p>
                        <p className='text-[14px] sm:text-[18px]'>
                          {event.eventStartDate} - {event.eventEndDate}
                        </p>
                      </div>

                      <p className='text-[16px] sm:text-[18px]'>
                        {event.eventBudget}
                      </p>
                    </div>

                    <div className='sm:flex items-center gap-16 mt-4'>
                      <div className='flex gap-2 items-center justify-center'>
                        <img
                          src={EVENTDETAILS_04}
                          alt='Location Icon'
                          className='object-scale-down w-[20px]'
                        />
                        <p className='text-[16px] text-[#9381FF]'>
                          {event.address.city}, {event.address.state}
                        </p>
                      </div>
                      <p className='text-[16px]'>
                        {event.eventCategory}, {event.eventSubCategory}
                      </p>
                      <div className='flex justify-center'>
                        <div className='rounded-full w-[90px] sm:w-[110px] py-2 px-3 bg-[#B5F9C4] font-poppins'>
                          <p className='text-[#178751] font-semibold normal-case text-center text-[12px] sm:text-[16px]'>
                            {event.eventType}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className='mb-10 text-gray-500'>
              There are no other events by this client
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default OtherEvents;
