import { Button } from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import { MdAccessTime, MdCalendarMonth } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { setAlert } from '../../app/features/alerts/alertSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';
import Connecting_events from '../../assets/homepage/home_1.png';
import More_proposals from '../../assets/homepage/home_2.png';
import More_clients from '../../assets/homepage/home_3.png';
import AlertBox from '../../components/alert-box';
import CardCarousel from '../../components/carousel';
import { Event } from '../../types';
import api from '../../utils/api';

function Index() {
  const dispatch = useAppDispatch();
  const [recentEvents, setRecentEvents] = useState<Event[]>([]);

  const { message, color, open } = useAppSelector(
    (state: RootState) => state.alert
  );

  useEffect(() => {
    const fetchRecentEvents = async () => {
      const { data } = await api.get('/events/recent');
      return setRecentEvents(data);
    };
    fetchRecentEvents();
  }, []);

  const myDiv = document.getElementById('myDiv');

  if (myDiv) {
    // Set the scroll position (in pixels) within the div
    const scrollPosition = 150; // Replace with your desired position
    myDiv.scrollTop = scrollPosition;
  }

  return (
    <div className='container mx-auto'>
      <AlertBox
        color={color}
        variant='ghost'
        text={message!}
        open={open}
        setOpen={() =>
          dispatch(setAlert({ open: false, message: '', color: 'green' }))
        }
      />
      <section className='py-0 md:py-0 grid md:grid-cols-2 content-center px-2'>
        <img
          src={Connecting_events}
          alt='Connecting events img for desktop'
          className='w-full object-scale-down block md:hidden'
        />

        <div className='px-0 md:px-8 lg:px-16 flex flex-col justify-center items-center md:items-start text-center md:text-left mb-8'>
          <p>The worlds first AV Event Bidding Platform</p>
          <h1 className='text-primary'>
            Connecting Event Managers with <br />
            <span className='text-[#FF5533]'>AV Providers</span>
          </h1>

          <Link to='/sign-in'>
            <Button
              variant='filled'
              color='indigo'
              size='sm'
              className='rounded-md w-36 mt-4 py-4 bg-primary font-poppins'
            >
              <span className='text-white normal-case text-[13px]'>
                Get Started
              </span>
            </Button>
          </Link>
        </div>

        <img
          src={Connecting_events}
          alt='Connecting events img for mobile'
          className='w-full object-scale-down hidden md:block'
        />
      </section>

      <section className='py-8 md:py-0 grid md:grid-cols-2 content-center px-4 sm:px-2'>
        <img
          src={More_proposals}
          alt='What to get more proposals img'
          className='w-full object-scale-down'
        />
        <div className='px-0 md:px-8 lg:px-16 flex flex-col justify-center items-center md:items-start text-center md:text-left'>
          <p className='bg-[#B5F9C4] text-[#178751] font-semibold px-3 py-[1px] w-max rounded-xl mb-4'>
            Event Managers
          </p>
          <h2 className='text-black font-extrabold text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-normal lg:leading-snug xl:leading-snug'>
            Want to Get More Proposals?
          </h2>
          <p className='mt-4'>Post your event on our events listing page. </p>
          <div className='mt-6 mb-4'>
            <div className='flex items-center gap-3'>
              <div className='flex items-center justify-center rounded-full w-9 h-9 sm:w-12 sm:h-12 bg-gray-200'>
                <MdCalendarMonth className='text-secondary text-[20px] sm:text-[24px]' />
              </div>
              <p className='text-left'>
                Receive multiple proposals for you event.
              </p>
            </div>

            <div className='flex items-center mt-4 gap-3'>
              <div className='flex items-center justify-center rounded-full w-9 h-9 sm:w-12 sm:h-12 bg-gray-200'>
                <MdAccessTime className='text-secondary text-[20px] sm:text-[24px]' />
              </div>
              <p className='text-left'>
                Save time and resources by having <br></br>proposals sent to you
              </p>
            </div>
          </div>

          <Link to='/event-planner#faqSection'>
            <Button
              variant='filled'
              color='indigo'
              size='sm'
              className='rounded-md w-36 mt-4 py-4 bg-primary font-poppins'
            >
              <span className='text-white normal-case text-[13px]'>
                Learn More
              </span>
            </Button>
          </Link>
        </div>
      </section>

      <section className='overflow-x-hidden overflow-y-hidden'>
        <CardCarousel data={recentEvents} />
      </section>

      <section className='my-8 md:my-16 grid md:grid-cols-2 content-center rounded-lg bg-secondary mx-2 overflow-x-hidden overflow-y-hidden'>
        <div className='md:px-8 lg:px-16 flex flex-col justify-center items-center md:items-start text-center md:text-left  p-8 pt-12  md:pt-8'>
          <p className='bg-[#B5F9C4] text-[#178751] font-semibold px-3 py-[1px] w-max rounded-xl mb-4'>
            AV Providers
          </p>
          <h2 className='text-black'>
            Want to Get More <span className='text-white'>Clients?</span>
          </h2>
          <p className='text-white mt-4 mb-3 font-light'>
            Browse the events listing page, and submit your proposal. No more
            cold calling or emailing for new clients.
          </p>

          <Link to='/av-providers#avFaqSection'>
            <Button
              variant='filled'
              color='indigo'
              size='sm'
              className='rounded-md w-36 mt-4 py-4 bg-primary font-poppins'
            >
              <span className='text-white normal-case text-[13px]'>
                Learn More
              </span>
            </Button>
          </Link>
        </div>

        <div className=''>
          <img
            src={More_clients}
            alt='want to get more clients img'
            className='object-contain w-[300px] sm:w-[500px] mx-8 '
          />
        </div>
      </section>

      {/* <section className='bg-[#E2E5FA] rounded-lg p-6 '>
      <h2 className='text-[25px] text-center text-primary mb-4'>Site Map</h2>
      <div>
        <div className='text-[16px] font-medium'>
          <Link to='/event-planner'>
            <div className='mb-2'>1_event Planner</div>
          </Link>
          <Link to='/av_providers'>
            <div className='mb-2'>AV_Providers</div>
          </Link>
          <Link to='/3_services'>
            <div className='mb-2'>3_services</div>
          </Link>
          <Link to='/4_event_categories'>
            <div>Event Categories</div>
          </Link>
        </div>

        <div className='text-[16px] font-medium'>
          <Link to='/sign-up'>
            <div className='mb-2'>sign-up</div>
          </Link>
          <Link to='/8_about_us'>
            <div className='mb-2'>8_about_us</div>
          </Link>
          <Link to='/sign-in'>
            <div>6_existing_users (sign in page)</div>
          </Link>
        </div>

        <div className='text-[16px] font-medium'>
          <Link to='/contact-us'>
            <div className='mb-2'>contact-us</div>
          </Link>
          <Link to='/09_events'>
            <div className='mb-2'>09_events</div>
          </Link>
          <Link to='/10_event_details_page'>
            <div>10_event_details_page</div>
          </Link>
        </div>
      </div>

      <h2 className='text-[25px] text-center text-primary mb-4'>Dashboard</h2>
      <div>
        <div className='text-[16px] font-medium'>
          <Link to='/dashboard'>
            <div className='mb-2'>Dashboard Home</div>
          </Link>

          <Link to='/12_events'>
            <div className='mb-2'>12_events</div>
          </Link>

          <Link to='/13_event_details_page'>
            <div className='mb-2'>13_event_details_page</div>
          </Link>
          <Link to='/13_edit_event'>
            <div className='mb-2'>13_edit_events</div>
          </Link>

          <Link to='/13_edit_event_1'>
            <div className='mb-2'>13_edit_event_1</div>
          </Link>
        </div>

        <div className='text-[16px] font-medium'>
          <Link to='/13_edit_event_2'>
            <div className='mb-2'>13_edit_event_2</div>
          </Link>

          <Link to='/13_edit_event_3'>
            <div className='mb-2'>13_edit_event_3</div>
          </Link>

          <Link to='/13_edit_event_4'>
            <div className='mb-2'>13_edit_event_4</div>
          </Link>

          <Link to='/13_edit_event_5'>
            <div className='mb-2'>13_edit_event_5</div>
          </Link>
        </div>

        <div className='text-[16px] font-medium'>
          <Link to='/13_edit_event_6'>
            <div className='mb-2'>13_edit_event_6</div>
          </Link>

          <Link to='/14_messages'>
            <div className='mb-2'>14_messages</div>
          </Link>

          <Link to='/14_messages_empty'>
            <div className='mb-2'>14_messages_empty</div>
          </Link>

          <Link to='/15_dashboard'>
            <div className='mb-2'>15_Dashboard</div>
          </Link>

          <Link to='/17_billing'>
            <div className='mb-2'>17_Billing</div>
          </Link>

          <Link to='/11_dashboard_add_member'>
            <div className='mb-2'>11_dashboard_add_member</div>
          </Link>

          <Link to='/11_dashboard_delete_member'>
            <div className='mb-2'>11_dashboard_delete_member</div>
          </Link>
        </div>
      </div>
    </section> */}
    </div>
  );
}

export default Index;
