// src/Carousel.tsx
import { differenceInDays, parseISO } from "date-fns";
import React, { RefObject } from "react";
import {
  MdArrowBack,
  MdArrowForward,
  MdBookmarkBorder,
  MdLens,
  MdOutlineCalendarMonth,
  MdBrightness1,
} from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import ICON from "../../src/assets/homepage/icon.png";
import { setAlertWithTimeout } from "../app/features/alerts/alertSlice";
import { useAppDispatch } from "../app/hooks";
import { useGetCurrentUser } from "../app/hooks/useUser";
import { Event } from "../types";
import api from "../utils/api";

interface CarouselProps {
  data: Event[];
}

const Carousel: React.FC<CarouselProps> = ({ data }) => {
  const user = useGetCurrentUser();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const settings: Settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: Math.min(data.length, 4),
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const sliderRef: RefObject<Slider> = React.createRef();

  const nextSlide = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  const prevSlide = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };

  const currentDate = new Date();

  const handleSaveEvent = async (id: string) => {
    try {
      const { data } = await api.post(`/events/save/${id}`);
      dispatch(
        setAlertWithTimeout({
          message: data.message,
          color: "green",
          open: true,
        })
      );
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
    }
  };

  return (
    // <div className="mt-4 sm:mt-10  md:mt-14 lg:mt-10 xl:mt-16 2xl:mt-0 ">
    //   <div className="flex items-center justify-center sm:justify-between">
    //     <h2 className="text-black text-center sm:text-left ml-4 mb-3 sm:mb-4">
    //       Event Listings Snapshot
    //     </h2>
    //     {/* Buttons for navigation */}

    //     <div className="hidden sm:block">
    //       <div className="flex items-center justify-end gap-4 mb-2 mr-6 mt-4 sm:mt-0">
    //         <div className="flex items-center justify-center rounded-full w-8 h-8 sm:w-12 sm:h-12 bg-primary ">
    //           <MdArrowBack
    //             size={24}
    //             className="text-white"
    //             onClick={nextSlide}
    //           />
    //         </div>

    //         <div className="flex  items-center justify-center rounded-full w-8 h-8 sm:w-12 sm:h-12 bg-primary ">
    //           <MdArrowForward
    //             size={24}
    //             className="text-white"
    //             onClick={prevSlide}
    //           />
    //         </div>
    //       </div>
    //     </div>
    //   </div>

    //   {/* Slider component */}
    //   <Slider ref={sliderRef} {...settings}>
    //     {data.map((event, index) => (
    //       <div key={index} className="px-3">
    //         <div className="bg-[#F3F1FB]  h-max w-full rounded-lg py-4 sm:py-2 sm:p-2">
    //           <div className="flex items-center justify-center">
    //             <div className="">
    //               <div className="px-4 py-2 sm:py-4">
    //                 <div className="grid grid-cols-1 gap-4 mb-4">
    //                   <div className="flex items-center">
    //                     <div className="grid grid-cols-12 w-full">
    //                       <div className="col-span-3">
    //                         <img
    //                           src={ICON}
    //                           alt="event_icon"
    //                           className="w-[45px]"
    //                         />
    //                       </div>

    //                       <div className="col-span-8 self-center">
    //                         <h2 className="text-[18px] mb-2 text-left truncate">
    //                           {event.title}
    //                         </h2>
    //                       </div>
    //                       {user && user.userType === "PROVIDER" && (
    //                         <div
    //                           className="col-span-1 justify-self-end"
    //                           onClick={() => handleSaveEvent(event._id)}
    //                         >
    //                           <MdBookmarkBorder className="text-[20px] text-[#C5BDBD] cursor-pointer" />
    //                         </div>
    //                       )}
    //                     </div>
    //                   </div>

    //                   <div className="">
    //                     <div className="flex items-center gap-2">
    //                       <MdOutlineCalendarMonth className="self-start text-[26px] text-[#8645FF]" />
    //                       <p className="text-[15px] mt-1">
    //                         {event.eventStartDate} to {event.eventEndDate}
    //                       </p>
    //                     </div>
    //                   </div>
    //                 </div>

    //                 {/* <div className="flex items-center gap-3 mb-6">
    //                 <div className="self-start">
    //                   <img src={ICON} alt="aad" />
    //                 </div>

    //                 <h2 className="text-[18px] mb-2">{event.title}</h2>
    //                 <div className="grow">
    //                   <h2 className="text-[18px] mb-2">{event.title}</h2>

    //                   <div className="flex items-center gap-2">
    //                     <MdOutlineCalendarMonth className="self-start text-[26px] text-[#8645FF]" />
    //                     <p className="text-[15px] mt-1">
    //                       {event.eventStartDate} to {event.eventEndDate}
    //                     </p>
    //                   </div>
    //                 </div>
    //                 <MdBookmarkBorder className="text-[26px] text-[#C5BDBD] " />
    //               </div> */}

    //                 <h6 className="text-[18px] mb-2 truncate">
    //                   {event.eventCategory}, {event.eventSubCategory}
    //                 </h6>

    //                 <div className="mb-6">
    //                   <p className="truncate mb-2">
    //                     {event.address?.city}, {event.address?.state}
    //                   </p>

    //                   <div className="flex items-center gap-2">
    //                     <MdLens className="text-[#D8D0FA] text-[15px]" />
    //                     {differenceInDays(
    //                       parseISO(event.proposalDueDate),
    //                       currentDate
    //                     ) < 0 ? (
    //                       <p className="text-[15px]">
    //                         Proposals no longer accepted
    //                       </p>
    //                     ) : differenceInDays(
    //                         parseISO(event.proposalDueDate),
    //                         currentDate
    //                       ) === 0 ? (
    //                       <p className="text-[15px] truncate">Closing today</p>
    //                     ) : (
    //                       <p className="text-[15px]">
    //                         {differenceInDays(
    //                           parseISO(event.proposalDueDate),
    //                           currentDate
    //                         )}{" "}
    //                         days left
    //                       </p>
    //                     )}
    //                   </div>
    //                 </div>

    //                 <div className="bg-[#DDD8F6] w-max rounded-lg text-center py-1 px-3 mb-6">
    //                   <p className="font-medium">{event.eventType}</p>
    //                 </div>

    //                 <h2 className="text-[18px] mb-6">{event.eventBudget}</h2>

    //                 <div
    //                   className="bg-[#C9C0F3] w-max py-3 px-6 rounded-full mb-0 sm:mb-4 text-[#181059] font-bold cursor-pointer text-center"
    //                   onClick={() => navigate(`/events/${event._id}`)}
    //                 >
    //                   Apply Now
    //                 </div>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     ))}
    //   </Slider>

    //   <div className="flex items-center justify-end gap-4 mb-2 mr-6 mt-4 sm:mt-0 md:hidden lg:hidden xl:hidden"></div>
    // </div>

    <div>
      <h2 className="text-black text-center sm:text-left ml-4 mb-3 sm:mb-4">
        Event Listings Snapshot
      </h2>
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-[#F3F1FB] rounded-xl px-6 py-8">
          <h1 className="text-[24px] font-bold text-[#000] mb-1">
            National Expo
          </h1>

          <div className="flex items-center gap-2 mb-6">
            <MdOutlineCalendarMonth className="self-start text-[26px] text-[#8645FF]" />

            <p className="text-[14px] font-normal text-[#353535]">
              10/10/2024 - 10/15/2024
            </p>
          </div>

          <h1 className="text-[18px] font-bold text-[#000] mb-1">
            Corporate, Conference
          </h1>

          <div className="flex items-center gap-2 mb-4">
            <p className="text-[15px] font-normal text-[#353535]">
              Phoenix, Arizona
            </p>

            <MdBrightness1 className="text-[#D8D0FA] text-[13px]" />

            <p className="text-[14px] font-normal text-[#353535]">
              3 days left
            </p>
          </div>

          <p className="text-[15px] font-normal text-[#000] bg-[#DDD8F6] px-3 py-[1px] w-max rounded-lg mb-6">
            Hybrid
          </p>

          <p className="text-[18px] font-bold text-[#000] mb-6">
            $70,000 - $150,000
          </p>

          <p className="text-[#181059] font-bold text-[16px] bg-[#C9C0F3] px-6 py-3 rounded-full w-max text-center">
            View Listing
          </p>
        </div>

        <div>
          <div className="bg-[#F3F1FB] rounded-xl px-6 py-8">
            <h1 className="text-[24px] font-bold text-[#000] mb-1">
              World Tech Show
            </h1>

            <div className="flex items-center gap-2 mb-6">
              <MdOutlineCalendarMonth className="self-start text-[26px] text-[#8645FF]" />

              <p className="text-[14px] font-normal text-[#353535]">
                12/10/2025 - 12/13/2025
              </p>
            </div>

            <h1 className="text-[18px] font-bold text-[#000] mb-1">
              Corporate, Conference
            </h1>

            <div className="flex items-center gap-2 mb-4">
              <p className="text-[15px] font-normal text-[#353535]">
                Phoenix, Arizona
              </p>

              <MdBrightness1 className="text-[#D8D0FA] text-[13px]" />

              <p className="text-[14px] font-normal text-[#353535]">
                3 days left
              </p>
            </div>

            <p className="text-[15px] font-normal text-[#000] bg-[#DDD8F6] px-3 py-[1px] w-max rounded-lg mb-6">
              Hybrid
            </p>

            <p className="text-[18px] font-bold text-[#000] mb-6">
              $70,000 - $150,000
            </p>

            <p className="text-[#181059] font-bold text-[16px] bg-[#C9C0F3] px-6 py-3 rounded-full w-max text-center">
              View Listing
            </p>
          </div>
        </div>
        <div>
          <div className="bg-[#F3F1FB] rounded-xl px-6 py-8">
            <h1 className="text-[24px] font-bold text-[#000] mb-1">
              Company Conference
            </h1>

            <div className="flex items-center gap-2 mb-6">
              <MdOutlineCalendarMonth className="self-start text-[26px] text-[#8645FF]" />

              <p className="text-[14px] font-normal text-[#353535]">
                01/2/24 - 01/5/24
              </p>
            </div>

            <h1 className="text-[18px] font-bold text-[#000] mb-1">
              Corporate, Conference
            </h1>

            <div className="flex items-center gap-2 mb-4">
              <p className="text-[15px] font-normal text-[#353535]">
                Phoenix, Arizona
              </p>

              <MdBrightness1 className="text-[#D8D0FA] text-[13px]" />

              <p className="text-[14px] font-normal text-[#353535]">
                3 days left
              </p>
            </div>

            <p className="text-[15px] font-normal text-[#000] bg-[#DDD8F6] px-3 py-[1px] w-max rounded-lg mb-6">
              Hybrid
            </p>

            <p className="text-[18px] font-bold text-[#000] mb-6">
              $70,000 - $150,000
            </p>

            <p className="text-[#181059] font-bold text-[16px] bg-[#C9C0F3] px-6 py-3 rounded-full w-max text-center">
              View Listing
            </p>
          </div>
        </div>
        <div className="relative">
          <div className="flex items-center justify-center absolute top-[50%] right-[50%]">
            <p className="text-[#957FEF] underline font-bold text-[18px] cursor-pointer">
              See More
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
