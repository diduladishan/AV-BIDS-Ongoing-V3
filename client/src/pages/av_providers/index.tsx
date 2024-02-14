import React from "react";
import { Button } from "@material-tailwind/react";
import AVPROVIDER_main_img from "../../assets/AV Providers/Credit card-rafiki 1.png";
import How_to_start_01 from "../../assets/AV Providers/Login-rafiki 1.png";
import How_to_start_02 from "../../assets/AV Providers/Search-rafiki (1) 1.png";
import How_to_start_03 from "../../assets/AV Providers/Files sent-rafiki 1.png";
import { Link } from "react-router-dom";
import { MdArrowForward, MdCheckCircle } from "react-icons/md";

import Accordion from "./components/AccordionCustomIcon";

function index() {
  return (
    // <div>index</div>
    <div className="mx-auto">
      <section className="mb-8 content-center">
        {/* <div className="grid lg:grid-cols-2 gap-4 content-center"> */}
        <div className="grid md:grid-cols-2 content-center bg-[#060139] sm:py-16">
          <div className="flex flex-col justify-center items-center px-8 mt-8 sm:mb-8">
            <div className="justify-center items-center text-center lg:text-left">
              <div className="flex items-center justify-center sm:justify-start">
                <div className="bg-[#B5F9C4] rounded-full mb-4">
                  <p className="text-[#178751] font-semibold px-4 py-1.5 text-center ">
                    For AV Providers
                  </p>
                </div>
              </div>

              <h2 className="font-poppins font-extrabold text-[#fff] mb-8 sm:text-left">
                Why pay for AV Bids?
              </h2>
              <p className="text-[#fff] my-4 text-center sm:text-left ">
                We offer a unique listing site that is specific to the events
                industry. We wanted to create a platform that connects av
                providers to event managers to help companies get new clients
                without having to cold call.
              </p>
              <div className=" mb-8">
                <div className="flex gap-3">
                  <div className="">
                    <MdCheckCircle className="text-[#42D27A] text-[21px]" />
                  </div>

                  <p className="mb-8  text-[#fff] text-left">
                    Browse events that actively need proposals and simply submit
                    yours
                  </p>
                </div>

                <div className="flex gap-3">
                  <div className="">
                    <MdCheckCircle className="text-[#42D27A] text-[21px]" />
                  </div>
                  <p className="mb-8 text-[#fff] text-left">
                    Add up to three members for your organization
                  </p>
                </div>

                <div className="flex gap-3">
                  <div className="">
                    <MdCheckCircle className="text-[#42D27A] text-[21px]" />
                  </div>
                  <p className="mb-0 text-[#fff] text-left">
                    Chat with event managers and request event information all
                    from our site
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-center sm:justify-start">
                <Link to="/sign-in">
                  <button className="flex items-center bg-[#8645FF] text-white rounded-full py-2 px-8 text-center font-semibold text-lg hover:bg-[#8645FF] focus:outline-none focus:ring-2 focus:ring-[#8645FF]">
                    Get Started
                    {/* <MdArrowForward size={24} className="text-[#fff] ml-4" /> */}
                  </button>
                </Link>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center items-center mt-16 sm:mt-8 md:mt-0 mb-6">
            <img
              src={AVPROVIDER_main_img}
              alt="AV provider section main img"
              className="w-[600px] object-scale-down"
            />
          </div>
        </div>
      </section>

      <section className="container mx-auto">
        <div className="flex items-center justify-center">
          <div className="bg-[#B5F9C4] rounded-full w-36 mb-4">
            <p className="text-[#178751] text-center font-semibold px-4 py-1">
              Our Process
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-primary text-center mb-4">How to get started?</h2>
          <div className="font-poppins font-normal text-[#353535] text-center mb-8">
            We make it simple and easy to start getting more proposals sent to
            you without having to reach out independently yourself
          </div>

          <div>
            <div className="grid lg:grid-cols-3 gap-8 px-8">
              <div>
                <div className="">
                  <div className="flex justify-center align-items">
                    <img
                      src={How_to_start_01}
                      alt="create account"
                      className="w-[400px] object-scale-down"
                    />
                  </div>

                  <div className="flex items-center justify-center mb-3">
                    <div className="flex items-center justify-center rounded-full w-12 h-12 bg-primary">
                      <p className="text-white font-semibold">1</p>
                    </div>
                  </div>

                  <div className="text-center font-poppins font-bold text-[23px] text-[#000000] mb-4">
                    create your account
                  </div>
                  <div className="text-center font-poppins font-normal text-[16px] text-[#353535] p-8 pt-0">
                    Add as much detail about you or your organization as you
                    want. You can even add additional members who will have
                    access to your account.
                  </div>
                </div>
              </div>

              <div>
                <div className="flex justify-center align-items">
                  <img
                    src={How_to_start_02}
                    alt="browse the event listings"
                    className="w-[400px] object-scale-down"
                  />
                </div>

                <div className="flex items-center justify-center mb-3">
                  <div className="flex items-center justify-center rounded-full w-12 h-12 bg-primary">
                    <p className="text-white font-semibold">2</p>
                  </div>
                </div>
                <div className="text-center font-poppins font-bold text-[23px] text-[#000000] mb-4">
                  Browse the event listings
                </div>
                <div className="text-center font-poppins font-normal text-[16px] text-[#353535] p-8 pt-0">
                  Choose from a multitude of options for events. You can start
                  with in-person only or hybrid, from there you choose what
                  categories of events you want to see. You can view the event
                  categories on our “Event Categories” page.
                </div>
              </div>

              <div>
                <div className="flex justify-center align-items">
                  <img
                    src={How_to_start_03}
                    alt="submit your proposal"
                    className="w-[400px] object-scale-down"
                  />
                </div>

                <div className="flex items-center justify-center mb-3">
                  <div className="flex items-center justify-center rounded-full w-12 h-12 bg-primary">
                    <p className="text-white font-semibold">3</p>
                  </div>
                </div>
                <div className="text-center font-poppins font-bold text-[23px] text-[#000000] mb-4">
                  Submit your proposal
                </div>
                <div className="text-center font-poppins font-normal text-[16px] text-[#353535] p-8 pt-0">
                  View or download the av requirements on the event listing
                  post, from there simply type up your proposal or chat with the
                  event planner for more info on the event.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto bg-[#F3F1FB] py-4 mt-8 mb-4 rounded-lg">
        <section className="my-8 px-2" id="faqSection">
          <div className="px-8">
            <h2 className="text-primary text-center mb-4">
              Frequently Asked Questions
            </h2>

            <Accordion />
          </div>
        </section>
      </div>

      <div className="container mx-auto">
        <section className="py-6 ">
          <div className="bg-[#181059] py-8 px-4 rounded-lg">
            <h2 className="text-center text-[#fff] mb-4">
              Our results in numbers
            </h2>
            <p className="text-center text-sm text-[#fff] mb-8">
              This visual aid represents the time and resources saved using AV
              Bids*
            </p>

            <div className="flex justify-center items-center mb-8">
              <div>
                <div className="grid grid-rows-2 text-center lg:flex lg:gap-[114px] mb-6">
                  <div className="">
                    <h2 className="text-[30px] text-[#fff]  ">
                      9<span className="text-purple_two">+</span>
                    </h2>
                  </div>
                  <div>
                    <p className="text-[20px] text-[#fff]">
                      Hours spent per week on client acquisition
                    </p>
                  </div>
                </div>

                <div className="grid grid-rows-2 text-center lg:flex lg:gap-8 mb-6">
                  <div>
                    <h2 className="text-[30px] text-[#fff]  ">
                      $1,000<span className="text-purple_two">+</span>
                    </h2>
                  </div>
                  <div>
                    <p className="text-[20px] text-[#fff]">
                      Amount spent per week on client acquisition
                    </p>
                  </div>
                </div>

                <div className="grid grid-rows-2 text-center lg:flex lg:gap-[83px] ">
                  <div>
                    <h2 className="text-[30px] text-[#fff]">
                      35<span className="text-purple_two">%</span>
                    </h2>
                  </div>
                  <div>
                    <p className="text-[20px] text-[#fff]">
                      Company growth potential each year using AV Bids
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="sm:flex justify-center items-center gap-6">
              {/* <div className="mb-6 sm:mb-0">
                <Button
                  variant="outlined"
                  size="sm"
                  className="w-full rounded-btn py-3 px-4 "
                >
                  <span className=" text-white normal-case text-[13px] mb-5">
                    Client Acquisitions averages
                  </span>
                </Button>
              </div> */}
              <div className="flex items-center justify-center">
                <Link to="/sign-in">
                  <button className="flex items-center bg-[#8645FF] text-[20px] text-white rounded-full py-2 px-8 text-center font-semibold text-lg hover:bg-[#8645FF] focus:outline-none focus:ring-2 focus:ring-[#8645FF] ">
                    <span className="text-[13px]">Get Started</span>
                    {/* <MdArrowForward size={24} className="text-[#fff] ml-4" /> */}
                  </button>
                </Link>
              </div>
            </div>
            <p className="text-[#fff] text-center text-[15px] mt-6 font-regular">
              *Client Acquisitions averages
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

export default index;
