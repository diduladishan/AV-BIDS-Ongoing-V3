import { Button } from '@material-tailwind/react';

import { differenceInDays, parseISO } from 'date-fns';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import EVENTS_PHOTO from '../../../../assets/09_events/events01.png';
import LOCATION_ICON from '../../../../assets/09_events/location.png';
import { Event } from '../../../../types';

interface EventListingCardProps {
  event: Event;
}

export const EventListingCard: FC<EventListingCardProps> = ({ event }) => {
  const navigate = useNavigate();

  const proposalDueDate = parseISO(event.proposalDueDate);
  const currentDate = new Date();

  const daysLeft = differenceInDays(proposalDueDate, currentDate);

  return (
    <div className=''>
      <div className='sm:grid grid-cols-12 gap-4 bg-[#F3F1FB] mb-8 px-6 py-6 rounded-lg w-full'>
        <div className='col-span-9'>
          <div className='sm:flex gap-4'>
            <div className=''>
              <img
                src={
                  event.thumbnail[0]?.url
                    ? `https://av-bids-bucket.s3.ap-south-1.amazonaws.com/${event.thumbnail[0]?.url}`
                    : EVENTS_PHOTO
                }
                alt='Event_photo'
                className='w-[73px]'
              />
            </div>
            <div>
              <h2
                className='text-[18px] cursor-pointer mb-2 xl:mb-0'
                onClick={() => navigate(`/events/${event._id}`)}
              >
                {event.title}
              </h2>

              <div className='xl:flex justify-between gap-32 w-max'>
                <p className='text-[16px] mb-2 xl:mb-0'>
                  <div className='sm:flex items-center gap-2'>
                    <div> Event Date:</div>

                    <div>
                      {event.eventStartDate} - {event.eventEndDate}
                    </div>
                  </div>
                </p>
                <p className='text-[16px]'>{event.eventBudget}</p>
              </div>

              <div className='xl:flex items-center justify-between gap-16 mt-4'>
                <div className='flex gap-1 items-center mb-2 xl:mb-0'>
                  <img
                    src={LOCATION_ICON}
                    alt='location_icon'
                    className='w-[20px]'
                  />
                  <p className='text-[16px] text-[#9381FF]'>
                    {event.address.city}, {event.address.state}
                  </p>
                </div>

                <p className='text-[16px] mb-2 xl:mb-0'>
                  {event.eventCategory}, {event.eventSubCategory}
                </p>

                <div className='rounded-full w-max py-2 px-3 bg-[#B5F9C4] font-poppins'>
                  <h2 className='text-[#178751] text-[12px]'>
                    {event.eventType}
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='col-span-3 sm:justify-self-end'>
          <div className='flex items-center justify-center sm:justify-between  gap-y-8  rounded-lg w-full mt-6 sm:mt-0'>
            <div className='sm:flex flex-col items-end'>
              <Button
                variant='filled'
                color='indigo'
                size='sm'
                className='rounded-md sm:w-max w-full py-3 bg-primary font-poppins rounded-full'
              >
                <span className='text-white normal-case'>Apply Now</span>
              </Button>
              <p className='text-[16px] mt-4'>
                {daysLeft > 0
                  ? `${daysLeft} days left to apply`
                  : 'Application closed'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventListingCard;
