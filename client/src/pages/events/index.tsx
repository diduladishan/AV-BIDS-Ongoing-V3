import { Option, Select, Spinner, Collapse } from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import { setAlert } from '../../app/features/alerts/alertSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';
import AlertBox from '../../components/alert-box';
import Pagination from '../../components/pagination';
import { Event } from '../../types';
import api from '../../utils/api';
import EventListingCard from './components/eventListingCard';
import Sidebar from './components/sidebar';
import Breadcrumbs from '../../components/Breadcrumbs';

import { Card } from '@material-tailwind/react';
import MobileSidebar from './components/mobileSidebar';

import Filter_Icon from '../../assets/09_events/Filter.png';

function Index() {
  const dispatch = useAppDispatch();
  const [events, setEvents] = useState<Event[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);

  const { message, color, open } = useAppSelector(
    (state: RootState) => state.alert
  );

  const [selectedSortOption, setSelectedSortOption] = useState<string>('');

  const [selectedEventType, setSelectedEventType] = useState<string[]>([]);
  const [selectedEventCategory, setSelectedEventCategory] = useState<string[]>(
    []
  );
  const [selectedPriceRange, setSelectedPriceRange] = useState<string[]>([]);
  const [selectedAudienceSize, setSelectedAudienceSize] = useState<string[]>(
    []
  );
  const [selectedEventSubCategory, setSelectedEventSubCategory] =
    useState<string>('');

  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 6;

  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  let currentEvents = events?.slice(indexOfFirstEvent, indexOfLastEvent);

  useEffect(() => {
    applyFilters(
      {
        eventType: selectedEventType,
        eventCategory: selectedEventCategory,
        eventSubCategory: selectedEventSubCategory,
        priceRange: selectedPriceRange,
        audienceSize: selectedAudienceSize,
        sortOption: selectedSortOption,
      },
      currentPage
    ); // Pass currentPage directly instead of relying on state
  }, [
    selectedEventType,
    selectedEventCategory,
    selectedEventSubCategory,
    selectedPriceRange,
    selectedAudienceSize,
    selectedSortOption,
    currentPage,
  ]);

  const applyFilters = async (filters: any, page: number = 1) => {
    try {
      setLoading(true);

      const filteredParams = Object.fromEntries(
        Object.entries(filters).filter(([key, value]) => Boolean(value))
      );

      const { data } = await api.get('/events', {
        params: {
          ...filteredParams,
          page,
          // pageSize: eventsPerPage
        },
      });

      if (!data.events || data.events.length === 0) {
        setEvents([]);
        setTotalItems(0);
      } else {
        setEvents(data.events);
        setTotalItems(data.totalCount);
      }
    } catch (error) {
      console.error('API Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = async (pageNumber: number) => {
    setCurrentPage(pageNumber);

    await applyFilters(
      {
        eventType: selectedEventType,
        eventCategory: selectedEventCategory,
        eventSubCategory: selectedEventSubCategory,
        priceRange: selectedPriceRange,
        audienceSize: selectedAudienceSize,
        sortOption: selectedSortOption,
      },
      pageNumber
    );
  };

  const handleSortChange = (value: string) => {
    setSelectedSortOption(value);
  };

  //toggle
  const [open1, setOpen] = useState(true);

  const toggleOpen = () => setOpen((cur) => !cur);

  return (
    <div className='bg-[#f9f8ff] relative h-[1200px]'>
      <Breadcrumbs />
      {loading ? (
        <div className='flex items-center justify-center h-screen'>
          <Spinner />
        </div>
      ) : (
        <>
          {/* <div>
            <h2 className="text-center text-primary mb-16">Event Listings </h2>
          </div> */}
          <div className='mb-10'>
            <AlertBox
              color={color}
              variant='ghost'
              text={message!}
              open={open}
              setOpen={() =>
                dispatch(setAlert({ open: false, message: '', color: 'green' }))
              }
            />
          </div>

          <div className='flex justify-center gap-6 '>
            {/* <MobileSidebar /> */}
            <div className='absolute md:relative top-10 left-3 z-10'>
              <img
                src={Filter_Icon}
                onClick={toggleOpen}
                alt='aad'
                className='w-[16px]  block md:hidden'
              />

              <Collapse open={open1}>
                {/* h-[calc(120vh-2rem)] */}
                <Card className='h-full shadow-none mb-6 bg-[#f3f1fb]'>
                  <div className=' '>
                    <Sidebar
                      selectedEventType={selectedEventType}
                      setSelectedEventType={setSelectedEventType}
                      selectedEventCategory={selectedEventCategory}
                      setSelectedEventCategory={setSelectedEventCategory}
                      selectedEventSubCategory={selectedEventSubCategory}
                      setSelectedEventSubCategory={setSelectedEventSubCategory}
                      selectedPriceRange={selectedPriceRange}
                      setSelectedPriceRange={setSelectedPriceRange}
                      selectedAudienceSize={selectedAudienceSize}
                      setSelectedAudienceSize={setSelectedAudienceSize}
                      applyFilters={applyFilters}
                    />
                  </div>
                </Card>
              </Collapse>
            </div>

            {/* <Sidebar
              selectedEventType={selectedEventType}
              setSelectedEventType={setSelectedEventType}
              selectedEventCategory={selectedEventCategory}
              setSelectedEventCategory={setSelectedEventCategory}
              selectedEventSubCategory={selectedEventSubCategory}
              setSelectedEventSubCategory={setSelectedEventSubCategory}
              selectedPriceRange={selectedPriceRange}
              setSelectedPriceRange={setSelectedPriceRange}
              selectedAudienceSize={selectedAudienceSize}
              setSelectedAudienceSize={setSelectedAudienceSize}
              applyFilters={applyFilters}
            /> */}

            <div className='w-max'>
              <h2 className='text-center text-primary mb-4'>Event Listings</h2>
              <div className='flex items-center justify-between mb-6 mx-4 z-20'>
                <p className='text-[14px]'>{events.length} events Found</p>

                <div className='w-[200px]'>
                  <Select
                    label='Sort events'
                    value={selectedSortOption}
                    // @ts-ignore
                    onChange={handleSortChange}
                  >
                    <Option value='ending_soonest'>Ending Soonest</Option>
                    <Option value='budget_lowest'>Budget Lowest</Option>
                    <Option value='budget_highest'>Budget Highest</Option>
                    <Option value='audience_size_lowest'>
                      Audience Size Lowest
                    </Option>
                    <Option value='audience_size_highest'>
                      Audience Size Highest
                    </Option>
                  </Select>
                </div>
              </div>

              {currentEvents?.length ? (
                currentEvents.map((event) => (
                  <div key={event._id} className='flex justify-center'>
                    <EventListingCard event={event} />
                  </div>
                ))
              ) : (
                <p>No events found for the selected filters.</p>
              )}

              <div className='flex justify-end mr-5'>
                {currentEvents?.length > 0 && (
                  <Pagination
                    currentPage={currentPage}
                    // totalItems={events.length || 0}
                    totalItems={totalItems}
                    itemsPerPage={eventsPerPage}
                    onPageChange={handlePageChange}
                  />
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Index;
