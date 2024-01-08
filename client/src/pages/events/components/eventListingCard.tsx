import { Button } from '@material-tailwind/react';

import { differenceInDays, parseISO } from 'date-fns';
import { FC } from 'react';
import LazyLoad from 'react-lazy-load';
import { useNavigate } from 'react-router-dom';
import { setAlertWithTimeout } from '../../../app/features/alerts/alertSlice';
import { updateUser } from '../../../app/features/user/userSlice';
import { useAppDispatch } from '../../../app/hooks';
import { useGetCurrentUser } from '../../../app/hooks/useUser';
import EVENTS_01 from '../../../assets/09_events/events01.png';
import EVENTS_02 from '../../../assets/09_events/location.png';
import SAVE_ICON from '../../../assets/09_events/save-icon.png';
import { Event } from '../../../types';
import api from '../../../utils/api';

interface EventListingCardProps {
  event: Event;
}

const EventListingCard: FC<EventListingCardProps> = ({ event }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const user = useGetCurrentUser();

  const thumbnailUrl =
    event?.thumbnail && event.thumbnail.length > 0
      ? `https://av-bids-bucket.s3.ap-south-1.amazonaws.com/${event.thumbnail[0]?.url}`
      : EVENTS_01;

  const handleSaveEvent = async () => {
    try {
      const { data } = await api.post(`/events/save/${event._id}`);
      dispatch(
        setAlertWithTimeout({
          message: data.message,
          color: 'green',
          open: true,
        })
      );
      dispatch(updateUser(data.user));
    } catch (error: any) {
      if (error.response) {
        dispatch(
          setAlertWithTimeout({
            message: error.response.data.error,
            color: 'red',
            open: true,
          })
        );
      } else if (error.request) {
        console.log('No response received from the server.');
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error while setting up the request:', error.message);
      }
    }
  };

  const proposalDueDate = parseISO(event.proposalDueDate);
  const currentDate = new Date();

  const daysLeft = differenceInDays(proposalDueDate, currentDate);
  return (
    <div className='mb-6'>
      <div className='flex items-center justify-center bg-[#fff] drop-shadow-lg gap-6 p-4 rounded-lg mx-4'>
        <div>
          <div className='flex items-center gap-4'>
            <div>
              <LazyLoad height={73} threshold={0.99}>
                <img
                  src={thumbnailUrl}
                  alt='aad'
                  className='w-[73px] rounded-lg object-contain'
                  loading='eager'
                />
              </LazyLoad>
            </div>

            <div>
              <div
                className='flex items-center  cursor-pointer'
                onClick={() => navigate(`/events/${event._id}`)}
              >
                <h2 className='text-[18px]  mb-1'>{event.title}</h2>
              </div>

              <div className='flex gap-1 items-center mb-1'>
                <img
                  src={EVENTS_02}
                  alt='aad'
                  className='object-scale-down w-[20px]'
                />
                <p className='text-[16px] text-[#9381FF]'>
                  {event?.address?.city ?? ''}, {event?.address?.state ?? ''}
                </p>
              </div>

              <p className='text-[16px] mb-1'>
                {event.eventCategory}, {event.eventSubCategory}
              </p>
            </div>
          </div>

          <div className='flex items-center gap-16 mt-0'>
            <div className='flex gap-36'>
              <p className='text-[16px] mb-1'>
                Event Date: {event.eventStartDate} - {event.eventEndDate}
              </p>
              <p className='text-[16px] mb-1 w-[160px]'>{event.eventBudget}</p>
            </div>
            <div className='bg-[#E4FFEA] rounded-full w-24 mb-4'>
              <p className='text-[#178751] text-[14px] text-center font-semibold px-2 py-1'>
                {event.eventType}
              </p>
            </div>
          </div>
        </div>

        <div className=''>
          {user?.userType === 'PROVIDER' && (
            <div
              className='flex justify-end cursor-pointer'
              onClick={() => handleSaveEvent()}
            >
              <img src={SAVE_ICON} alt='aad' className='w-[23px]' />
            </div>
          )}

          <Button
            variant='filled'
            color='indigo'
            size='sm'
            className='rounded-md w-36 py-4 mt-4 px-8 bg-primary font-poppins'
            disabled={daysLeft < 0}
            onClick={() => navigate(`/events/${event._id}`)}
          >
            <span className='text-white normal-case'>Apply Now</span>
          </Button>
          <p
            className={`text-[16px] mt-4 text-center ${
              daysLeft < 0 && 'text-red-500'
            }`}
          >
            {daysLeft > 0
              ? `${daysLeft} days left to apply`
              : 'Application closed'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default EventListingCard;
