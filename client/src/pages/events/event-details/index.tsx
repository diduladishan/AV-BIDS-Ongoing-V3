import { MdOutlineCancel } from 'react-icons/md';
import EVENTDETAILS_03 from '../../../assets/13_event_details_page/Rectangle 3759.png';
import EVENTDETAILS_02 from '../../../assets/13_event_details_page/carbon_time.png';
import draftMode from '../../../assets/13_event_details_page/draft_mode02.png';
import SPAM_ICON from '../../../assets/13_event_details_page/spam.png';

import { Button, Dialog } from '@material-tailwind/react';
import { differenceInDays, format, parseISO } from 'date-fns';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  setAlert,
  setAlertWithTimeout,
} from '../../../app/features/alerts/alertSlice';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { useGetCurrentUser } from '../../../app/hooks/useUser';
import { RootState } from '../../../app/store';
import AlertBox from '../../../components/alert-box';
import Spinner from '../../../components/spinner';
import { Event, UserWithReviewWithEvent } from '../../../types';
import api from '../../../utils/api';
import SubmitProposal from './components/SubmitProposal';
import Attachments from './components/attachments';
import AvRequirements from './components/av-requirements';
import EventInfo from './components/event-info';
import EventPlanner from './components/event-planner';
import OtherEvents from './components/other-events';
import SubmitQuestion from './components/submit-question';

export function Index() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [event, setEvent] = useState<Event | null>(null);
  const [userEvents, setUserEvents] = useState<Event[]>([]);
  const [planner, setPlanner] = useState<UserWithReviewWithEvent | null>(null);
  const [eventLoading, setEventLoading] = useState(false);
  const [userEventLoading, setUserEventLoading] = useState(false);
  const [plannerLoading, setPlannerLoading] = useState(false);
  const [openProposalDialog, setOpenProposalDialog] = useState(false);

  const { message, color, open } = useAppSelector(
    (state: RootState) => state.alert
  );

  const user = useGetCurrentUser();

  const handleOpen = () => setOpenProposalDialog((cur) => !cur);

  const fetchEventDetails = async () => {
    try {
      setEventLoading(true);
      const { data } = await api.get(`/events/${id}`);
      setEvent(data);
    } catch (error) {
      console.error('Error fetching event details:', error);
    } finally {
      setEventLoading(false);
    }
  };

  const fetchUserEvents = async (createdBy: string | undefined) => {
    try {
      setUserEventLoading(true);
      if (createdBy) {
        const { data } = await api.get(`/events/user/${createdBy}`);
        setUserEvents(data);
      }
    } catch (error) {
      console.error('Error fetching user events:', error);
    } finally {
      setUserEventLoading(false);
    }
  };

  const fetchEventPlanner = async (createdBy: string | undefined) => {
    try {
      setPlannerLoading(true);
      if (createdBy) {
        const { data } = await api.get(`/users/${createdBy}`);
        setPlanner(data);
      }
    } catch (error) {
      console.error('Error fetching planner info:', error);
    } finally {
      setPlannerLoading(false);
    }
  };

  const handleSaveEvent = async () => {
    try {
      const { data } = await api.post(`/events/save/${event?._id}`);
      dispatch(
        setAlertWithTimeout({
          message: data.message,
          color: 'green',
          open: true,
        })
      );
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

  useEffect(() => {
    fetchEventDetails();
  }, []);

  useEffect(() => {
    fetchUserEvents(event?.createdBy);
  }, [event?.createdBy]);

  useEffect(() => {
    fetchEventPlanner(event?.createdBy);
  }, [event?.createdBy]);

  const currentDate = new Date();

  const proposalDueDate = parseISO(event?.proposalDueDate!);

  const daysLeft = differenceInDays(proposalDueDate, currentDate);

  if (eventLoading) {
    return (
      <div className='flex items-center justify-center h-full'>
        <Spinner />
      </div>
    );
  }

  return (
    <div className='mx-auto mt-16 mb-8'>
      <AlertBox
        color={color}
        variant='ghost'
        text={message!}
        open={open}
        setOpen={() =>
          dispatch(setAlert({ open: false, message: '', color: 'green' }))
        }
      />

      <div>
        {event?.status === 'Draft' && (
          <>
            <img src={draftMode} alt='draft mode label' className='w-full' />
            <div className='bg-[#f3efa3] px-4'>
              <span className=''>
                <p className='text-center pt-2 text-[16px] sm:text-[22px]'>
                  This event is currently in draft mode.
                </p>
              </span>

              <p className='text-center pb-2 text-[16px] sm:text-[22px]'>
                Click{' '}
                <span
                  className='cursor-pointer text-[#b39a38] font-medium'
                  onClick={() => navigate(`/events/edit/${id}`)}
                >
                  Edit
                </span>{' '}
                to modify and publish the current event.
              </p>
            </div>
            <img src={draftMode} alt='draft mode label' className='w-full' />
          </>
        )}
      </div>

      <div className='grid lg:grid-cols-3 gap-4 content-center sm:mt-[100px] bg-[#fff]'>
        <div className='col-span-2 flex justify-center items-center px-8'>
          <section>
            <div>
              <div>
                <h2 className='text-primary text-[40px] mb-4 sm:text-left text-center'>
                  {event?.title}
                </h2>
              </div>
              <div className='sm:flex items-center mb-4 gap-8'>
                <div className='flex items-center gap-2 mb-2 sm:mb-0'>
                  <img
                    src={EVENTDETAILS_02}
                    alt='aad'
                    className='object-scale-down w-[22px]'
                  />
                  <p className='text-[16px]'>
                    Posted on{' '}
                    {event?.createdAt
                      ? format(new Date(event.createdAt), 'M/dd/yyyy')
                      : 'N/A'}
                  </p>
                </div>

                <div className='flex items-center gap-2 mb-2 sm:mb-0'>
                  <img
                    src={EVENTDETAILS_02}
                    alt='aad'
                    className='object-scale-down w-[22px]'
                  />
                  <p>
                    Updated on{' '}
                    {event?.createdAt
                      ? format(new Date(event.updatedAt), 'M/dd/yyyy')
                      : 'N/A'}
                  </p>
                </div>

                <div className='flex items-center gap-2 mb-2 sm:mb-0'>
                  <p className='font-semibold'>Status:</p>
                  <div
                    className={`bg-${
                      event?.status === 'Expired'
                        ? 'red'
                        : event?.status === 'Draft'
                        ? 'yellow' // Change this to the desired color for Draft status
                        : 'green'
                    }-500 rounded-full px-4 py-0.5`}
                  >
                    <p className='text-white text-center text-[10px] sm:text-[13px]'>
                      {event?.status}
                    </p>
                  </div>
                </div>
              </div>
              <div className='mb-6'>
                <img
                  src={
                    event?.thumbnail[0]?.url
                      ? `https://av-bids-bucket.s3.ap-south-1.amazonaws.com/${event?.thumbnail[0]?.url}`
                      : EVENTDETAILS_03
                  }
                  alt='thumbnail'
                  loading='lazy'
                  className='object-contain md:w-[400px] rounded-lg'
                />
              </div>
              <div className='bg-[#F3F1FB] p-6 mb-16 rounded-lg'>
                <h2 className='text-[20px] mb-4'>Description</h2>
                <div
                  dangerouslySetInnerHTML={{ __html: event?.description! }}
                />
              </div>

              <OtherEvents events={userEvents} loading={userEventLoading} />
              <SubmitQuestion event={event} />
            </div>
          </section>
          <section>
            <Dialog open={openProposalDialog} handler={handleOpen} size='xs'>
              <div className='flex justify-end p-3'>
                <MdOutlineCancel
                  size={32}
                  className='text-black cursor-pointer'
                  onClick={handleOpen}
                />
              </div>
              <SubmitProposal
                handleOpen={handleOpen}
                event={event}
                user={user}
              />
            </Dialog>
          </section>
        </div>
        <div className='col-span-2 sm:col-span-1 flex items-start justify-center  mx-2'>
          <section>
            {/* Only provider can submit proposals and save events */}
            {user?.userType === 'PROVIDER' && (
              <>
                <div className='mb-4'>
                  <Button
                    variant='filled'
                    color='indigo'
                    size='sm'
                    className='rounded-full w-full py-4 mt-4 px-8 bg-primary font-poppins'
                    onClick={handleOpen}
                    disabled={daysLeft < 0}
                  >
                    <span className='text-white normal-case text-[14px]'>
                      {daysLeft > 0
                        ? `Submit Proposal`
                        : 'Proposals are no longer accepted'}
                    </span>
                  </Button>

                  <Button
                    variant='outlined'
                    size='sm'
                    className='rounded-full w-full py-4 mt-4 px-8 font-poppins'
                    onClick={() => handleSaveEvent()}
                  >
                    <span className=' text-black normal-case text-[14px]'>
                      Save Event
                    </span>
                  </Button>
                </div>

                <div className='flex items-center justify-center gap-3 mb-6 '>
                  <img
                    src={SPAM_ICON}
                    alt='aad'
                    className='object-scale-down w-[24px]'
                  />
                  <p className='text-[18px] underline'>Flag as spam</p>
                </div>
              </>
            )}
            <EventInfo event={event} />
            {user && (
              <>
                <AvRequirements event={event} />
                <Attachments event={event} />
              </>
            )}
            <EventPlanner planner={planner} loading={plannerLoading} />
          </section>
        </div>
      </div>
    </div>
  );
}

export default Index;
