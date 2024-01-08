import {
  Card,
  Popover,
  PopoverContent,
  PopoverHandler,
  Spinner,
  Typography,
} from "@material-tailwind/react";

import {
  MdDeleteOutline,
  MdMoreVert,
  MdOutlineRemoveRedEye,
} from "react-icons/md";

import { format } from "date-fns";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  setAlert,
  setAlertWithTimeout,
} from "../../../app/features/alerts/alertSlice";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { useGetCurrentUser } from "../../../app/hooks/useUser";
import { RootState } from "../../../app/store";
import Breadcrumbs from "../../../components/Breadcrumbs";
import AlertBox from "../../../components/alert-box";
import { Event } from "../../../types";
import api from "../../../utils/api";

const TABLE_HEAD = ["Title", "Event Created", "Expires", "Update", ""];

function Index() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useGetCurrentUser();
  const [eventAlerts, setEventAlerts] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);

  const { message, color, open } = useAppSelector(
    (state: RootState) => state.alert
  );

  const formatDate = (date: Date) => format(new Date(date), "yyyy-MM-dd");

  useEffect(() => {
    const fetchEventAlerts = async () => {
      setLoading(true);
      try {
        const { data } = await api.get(`/events/alerts/user/${user?._id}`);
        setEventAlerts(data);
      } catch (error) {
        console.error("Failed to fetch event alerts:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEventAlerts();
  }, []);

  const removeEventAlert = async (eventId: string) => {
    setLoading(true);
    try {
      const { data: deleteResponse } = await api.delete(
        `/events/alerts/user/${user?._id}/${eventId}`
      );
      const { data } = await api.get(`/events/alerts/user/${user?._id}`);
      dispatch(
        setAlertWithTimeout({
          message: deleteResponse.message,
          color: "green",
          open: true,
        })
      );
      setEventAlerts(data);
    } catch (error: any) {
      if (error.response) {
        dispatch(
          setAlertWithTimeout({
            message: error.response.data.error,
            color: "red",
            open: true,
          })
        );
      } else if (error.request) {
        console.log("No response received from the server.");
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error while setting up the request:", error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleAlertClose = () => {
    dispatch(setAlert({ open: false, message: "", color: "green" }));
  };

  return (
    <div className="container mx-auto overflow-x-auto">
      <Breadcrumbs />
      <AlertBox
        color={color}
        variant="ghost"
        text={message!}
        open={open}
        setOpen={handleAlertClose}
      />
      <section className="bg-[#fff] px-8 py-8 rounded-xl drop-shadow mb-6 mx-2 min-w-min">
        <h2 className="text-[20px] font-semibold mb-4">Event Alerts</h2>

        <Card className="w-full shadow-none">
          {loading ? (
            <div className="flex items-center justify-center">
              <Spinner />
            </div>
          ) : (
            <>
              {eventAlerts.length > 0 ? (
                <table className="w-full min-w-max table-auto text-left">
                  <thead>
                    <tr>
                      {TABLE_HEAD.map((head) => (
                        <th
                          key={head}
                          className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 bg-[#e7daff]"
                        >
                          <Typography
                            variant="small"
                            className="font-medium leading-none !text-[#000]"
                          >
                            {head}
                          </Typography>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {eventAlerts.map(
                      (
                        { title, createdAt, eventEndDate, _id, eventType },
                        index
                      ) => {
                        const isLast = index === eventAlerts.length - 1;
                        const classes = isLast
                          ? "p-4"
                          : "p-4 border-b border-blue-gray-50";

                        return (
                          <tr key={_id}>
                            <td className={classes}>
                              <Typography
                                variant="small"
                                color="black"
                                className="font-bold !text-[#000]"
                              >
                                {title}
                                <p className="text-[#178751] bg-[#E4FFEA] w-max px-3 py-1 rounded-full mt-2 font-semibold">
                                  {eventType}
                                </p>
                              </Typography>
                            </td>
                            <td className={classes}>
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                              >
                                {formatDate(createdAt)}
                              </Typography>
                            </td>
                            <td className={classes}>
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                              >
                                {eventEndDate}
                              </Typography>
                            </td>
                            <td className={classes}>
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                              >
                                New Updates
                              </Typography>
                            </td>
                            <td className={classes}>
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-medium cursor-pointer"
                              >
                                <Popover placement="bottom-start">
                                  <PopoverHandler>
                                    <div>
                                      <MdMoreVert className="text-[18px]" />
                                    </div>
                                  </PopoverHandler>
                                  <PopoverContent>
                                    <div>
                                      <div
                                        className="flex items-center gap-2 mb-3 cursor-pointer"
                                        onClick={() =>
                                          navigate(`/events/${_id}`)
                                        }
                                      >
                                        <MdOutlineRemoveRedEye className="text-[20px]" />
                                        <p>View</p>
                                      </div>

                                      <div
                                        className="flex items-center gap-2 cursor-pointer text-red-500"
                                        onClick={() => removeEventAlert(_id)}
                                      >
                                        <MdDeleteOutline className="text-[20px]" />
                                        <p>Clear</p>
                                      </div>
                                    </div>
                                  </PopoverContent>
                                </Popover>
                              </Typography>
                            </td>
                          </tr>
                        );
                      }
                    )}
                  </tbody>
                </table>
              ) : (
                <p>New alerts for saved events will appear here</p>
              )}
            </>
          )}
        </Card>
      </section>
    </div>
  );
}

export default Index;
