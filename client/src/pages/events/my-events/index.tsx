import {
  Card,
  Option,
  Popover,
  PopoverContent,
  PopoverHandler,
  Select,
  Typography,
  Button,
} from "@material-tailwind/react";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setEvent } from "../../../app/features/events/eventSlice";
import Spinner from "../../../components/spinner";
import { Event } from "../../../types";
import api from "../../../utils/api";

import {
  MdDeleteOutline,
  MdEditNote,
  MdLens,
  MdMoreVert,
  MdOutlineRemoveRedEye,
} from "react-icons/md";
import { setAlert } from "../../../app/features/alerts/alertSlice";
import { useAppSelector } from "../../../app/hooks";
import { useGetCurrentUser } from "../../../app/hooks/useUser";
import { RootState } from "../../../app/store";
import AlertBox from "../../../components/alert-box";
import Pagination from "../../../components/pagination";

import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

import { MdOutlineError, MdCancelPresentation } from "react-icons/md";
import Breadcrumbs from "../../../components/Breadcrumbs";

const TABLE_HEAD = ["Title", "Event Created", "Proposals", "Status", ""];

function Index() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useGetCurrentUser();
  const { message, color, open } = useAppSelector(
    (state: RootState) => state.alert
  );

  const [myEvents, setMyEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState<string>("date_posted");

  const eventsPerPage = 10;
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;

  const currentEvents = myEvents?.slice(indexOfFirstEvent, indexOfLastEvent);

  const fetchMyEvents = async () => {
    try {
      const { data } = await api.get(`/events/user/${user?._id}`, {
        params: { sort: sortOption },
      });
      setMyEvents(data);
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSortChange = (value: string) => {
    setSortOption(value);
  };

  useEffect(() => {
    setCurrentPage(1);
    fetchMyEvents();
  }, [sortOption, user?._id]);

  const handleEdit = (event: Event) => {
    dispatch(setEvent(event));
    navigate(`/events/edit/${event._id}`);
  };

  const handleAlertClose = () => {
    dispatch(setAlert({ open: false, message: "", color: "green" }));
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleDeleteEvent = async (eventId: string) => {
    try {
      await api.delete(`/events/${eventId}`);
      const { data } = await api.get(`/events/user/${user?._id}`);
      setMyEvents(data);
    } catch (error) {
      console.log(error);
    }
  };

  // delete confirmation
  const [open_01, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open_01);

  return (
    <div className='overflow-x-auto overflow-y-auto sm:container sm:mx-auto '>
      <AlertBox
        color={color}
        variant='ghost'
        text={message!}
        open={open}
        setOpen={handleAlertClose}
      />
      <div className='overflow-auto'>
        <div className='mb-4'>
          <Breadcrumbs />
        </div>
        <section className='bg-[#fff] px-8 py-8 rounded-xl drop-shadow mb-6 min-w-max mx-2 sm:mx-0'>
          <div className='flex items-center justify-between mb-4'>
            <h2 className='text-[20px] font-semibold '>My Events</h2>
            <div>
              <Select
                className='rounded-lg bg-[#F3F1FB]'
                value={sortOption}
                // @ts-ignore
                onChange={handleSortChange}
              >
                <Option value='date_posted'>Date Posted</Option>
                <Option value='expiring_soonest'>Expiring Soonest</Option>
                <Option value='active'>Active</Option>
              </Select>
            </div>
          </div>
          {loading ? (
            <div className='flex items-center justify-center h-32'>
              <Spinner />
            </div>
          ) : myEvents.length === 0 ? (
            <p>No events found.</p>
          ) : (
            <Card className='h-full w-full shadow-none rounded-full'>
              <table className='w-full min-w-max table-auto text-left'>
                <thead>
                  <tr>
                    {TABLE_HEAD.map((head) => (
                      <th
                        key={head}
                        className='border-b border-blue-gray-100 bg-blue-gray-50 p-4 bg-[#e7daff]'
                      >
                        <p className='font-medium leading-none text-black text-[14px]'>
                          {head}
                        </p>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(myEvents) &&
                    currentEvents?.length! > 0 &&
                    currentEvents?.map((event, index) => (
                      <tr key={event._id}>
                        <td
                          className='p-4 border-b border-blue-gray-50 cursor-pointer'
                          onClick={() => navigate(`/events/${event._id}`)}
                        >
                          <p className='font-semibold'>
                            {event.title}
                            <div>
                              <div className='rounded-full w-20 py-1 bg-[#E4FFEA] font-poppins mt-2'>
                                <p className='text-[#178751] text-center text-[12px] font-semibold'>
                                  {event.eventType}
                                </p>
                              </div>
                            </div>
                          </p>
                        </td>
                        <td className='p-4 border-b border-blue-gray-50'>
                          <Typography
                            variant='small'
                            color='blue-gray'
                            className='font-normal'
                          >
                            {format(new Date(event.createdAt), 'dd MMM yyyy')}
                          </Typography>
                        </td>
                        <td className='p-4 border-b border-blue-gray-50'>
                          <Typography
                            variant='small'
                            color='blue-gray'
                            className='font-normal'
                          >
                            <p>{event.proposals.length} Proposals</p>
                          </Typography>
                        </td>

                        <td className='p-4 border-b border-blue-gray-50'>
                          <Typography
                            as='a'
                            variant='small'
                            color='blue-gray'
                            className='font-medium cursor-pointer'
                            onClick={() => handleEdit(event)}
                          >
                            <div className='flex items-center gap-1'>
                              <MdLens
                                className={
                                  event.status === 'Active'
                                    ? 'text-green-500 text-[7px]'
                                    : event.status === 'Expired'
                                    ? 'text-red-500 text-[7px]'
                                    : 'text-[#FAC715] text-[7px]'
                                }
                              />
                              <p
                                className={
                                  event.status === 'Active'
                                    ? 'text-green-500 '
                                    : event.status === 'Expired'
                                    ? 'text-red-500 '
                                    : 'text-[#FAC715] '
                                }
                              >
                                {event.status}
                              </p>
                            </div>
                          </Typography>
                        </td>
                        <td className='p-4 border-b border-blue-gray-50'>
                          <Typography
                            variant='small'
                            color='blue-gray'
                            className='font-medium cursor-pointer'
                          >
                            <Popover>
                              <PopoverHandler>
                                <div>
                                  <MdMoreVert />
                                </div>
                              </PopoverHandler>
                              <PopoverContent>
                                <div>
                                  <div
                                    className='flex items-center gap-2 mb-3 cursor-pointer'
                                    onClick={() =>
                                      navigate(`/events/${event._id}`)
                                    }
                                  >
                                    <MdOutlineRemoveRedEye className='text-[20px]' />
                                    <p>View</p>
                                  </div>
                                  <div
                                    className='flex items-center gap-2 mb-3 cursor-pointer'
                                    onClick={() => handleEdit(event)}
                                  >
                                    <MdEditNote className='text-[20px]' />
                                    <p>Edit</p>
                                  </div>
                                  <div
                                    className='flex items-center gap-2 cursor-pointer text-red-500'
                                    // onClick={() => handleDeleteEvent(event._id)}
                                    onClick={handleOpen}
                                  >
                                    <MdDeleteOutline className='text-[20px]' />
                                    <p>Delete</p>

                                    <div>
                                      <>
                                        <Dialog
                                          open={open_01}
                                          handler={handleOpen}
                                          size='xs'
                                        >
                                          <div
                                            className='flex justify-end p-2 text-[#829ab1] cursor-pointer'
                                            onClick={handleOpen}
                                          >
                                            <MdCancelPresentation className='text-[35px]' />
                                          </div>

                                          <div>
                                            <h2 className='text-[#102a43] text-[20px] sm:text-[30px] text-center mb-2'>
                                              Delete Event?
                                            </h2>

                                            <p className='text-[#102a43] text-center text-[16px] sm:text-[20px]'>
                                              Are you sure you want to delete{' '}
                                              <br></br>
                                              {event.title}
                                            </p>
                                          </div>

                                          <DialogFooter className='flex items-center justify-center gap-6 mt-4 mb-8'>
                                            <Button
                                              variant='filled'
                                              className='mr-1 bg-primary  w-[120px] h-min sm:w-[165px] sm:h-[45px] rounded-full'
                                              onClick={handleOpen}
                                            >
                                              <span className='normal-case  text-[#fff] text-center '>
                                                Cancel
                                              </span>
                                            </Button>
                                            <Button
                                              variant='filled'
                                              className='bg-[#e12929]  w-[120px] h-min sm:w-[165px] sm:h-[45px]  rounded-full'
                                              onClick={() =>
                                                handleDeleteEvent(event._id)
                                              }
                                            >
                                              <div className='flex items-center justify-center gap-2'>
                                                <span className='normal-case text-[#fff]'>
                                                  Delete Event
                                                </span>
                                                {/* <MdDeleteOutline className='text-[22px]' /> */}
                                              </div>
                                            </Button>
                                          </DialogFooter>
                                        </Dialog>
                                      </>
                                    </div>
                                  </div>
                                </div>
                              </PopoverContent>
                            </Popover>
                          </Typography>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </Card>
          )}

          <div className='flex justify-end'>
            <Pagination
              currentPage={currentPage}
              totalItems={myEvents.length || 0}
              itemsPerPage={eventsPerPage}
              onPageChange={handlePageChange}
            />
          </div>
        </section>
      </div>
    </div>
  );
}

export default Index;
