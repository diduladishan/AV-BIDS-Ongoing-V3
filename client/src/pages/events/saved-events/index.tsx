import { Option, Select, Spinner } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useGetCurrentUser } from "../../../app/hooks/useUser";
import Breadcrumbs from "../../../components/Breadcrumbs";
import Pagination from "../../../components/pagination";
import { Event } from "../../../types";
import api from "../../../utils/api";
import EventListingCard from "./components/eventListingCard";

function Index() {
  const user = useGetCurrentUser();
  const [currentPage, setCurrentPage] = useState(1);
  const [sortingOption, setSortingOption] = useState("datePosted"); // Default sorting option
  const [savedEvents, setSavedEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);
  const eventsPerPage = 5;

  useEffect(() => {
    const fetchSavedEvents = async () => {
      setLoading(true);
      try {
        const { data } = await api.get(`/events/saved/${user?._id}`);
        return setSavedEvents(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchSavedEvents();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [savedEvents, sortingOption]);

  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;

  let currentEvents = savedEvents?.slice(indexOfFirstEvent, indexOfLastEvent);

  // Sorting logic
  const sortedEvents = [...(currentEvents || [])].sort((a, b) => {
    const dateA = a.proposalDueDate && new Date(a.proposalDueDate).getTime();
    const dateB = b.proposalDueDate && new Date(b.proposalDueDate).getTime();

    if (sortingOption === "expiringSoonest") {
      // @ts-ignore
      return dateA - dateB;
    } else {
      // Default sorting by datePosted
      return (
        new Date(a.createdAt as unknown as string).getTime() -
        new Date(b.createdAt as unknown as string).getTime()
      );
    }
  });

  currentEvents = sortedEvents;

  const pageNumbers = [];
  for (
    let i = 1;
    i <= Math.ceil((user?.savedEvents?.length || 0) / eventsPerPage);
    i++
  ) {
    pageNumbers.push(i);
  }

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleSortingChange = (option: any) => {
    setSortingOption(option);
  };

  return (
    <div className="container mx-auto">
      <div className="mb-4">
        <Breadcrumbs />
      </div>
      <section className="bg-[#fff] px-2 py-8 rounded-xl drop-shadow mb-6 mx-2">
        <div className="flex items-center justify-between">
          <h2 className="text-[16px] sm:text-2xl font-semibold mx-4">
            Followed Events
          </h2>
          <div className="sm:flex items-center ">
            <span className="text-[14px] sm:text-[16px] mr-2 hidden md:block">
              Sort By:
            </span>
            <div className="w-max">
              <Select
                // label='Select Version'
                className="!bg-[#F3F1FB]"
                onChange={(e) => handleSortingChange(e)}
                value={sortingOption}
              >
                <Option value="datePosted">Date Posted</Option>
                <Option value="expiringSoonest">Expiring Soonest</Option>
              </Select>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center">
            <Spinner />
          </div>
        ) : (
          <>
            <div className="mt-8">
              {currentEvents?.length! > 0 ? (
                currentEvents?.map((event) => (
                  <div key={event._id}>
                    <EventListingCard event={event} />
                  </div>
                ))
              ) : (
                <p>Saved events will appear here</p>
              )}
            </div>

            <div className="flex justify-end">
              <Pagination
                currentPage={currentPage}
                totalItems={user?.savedEvents?.length || 0}
                itemsPerPage={eventsPerPage}
                onPageChange={handlePageChange}
              />
            </div>
          </>
        )}
      </section>
    </div>
  );
}

export default Index;
