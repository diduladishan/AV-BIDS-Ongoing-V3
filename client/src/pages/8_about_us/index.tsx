import React from "react";
import { Button } from "@material-tailwind/react";
import aboutUS_img from "../../assets/about us/AboutUs_01.png";
import { Link } from "react-router-dom";

function index() {
  return (
    <div className="container mx-auto">
      <section className="mb-8 mx-4">
        <h2 className="text-primary text-center mb-8 mt-8">About Us</h2>
        <div className="grid sm:grid-cols-2 gap-4 content-center px-4 bg-[#F3F1FB] rounded-lg py-8">
          <div className="flex justify-center items-center">
            <div>
              <img
                src={aboutUS_img}
                alt="About us section main img"
                className="w-[500px] object-scale-down mb-4"
              />
            </div>
          </div>

          <div className="flex justify-center items-center">
            <div>
              <h2 className="text-primary text-[30px] mb-6 text-center sm:text-left leading-[3rem]">
                AV Bids was created to address one industry problem:
                <span className="text-[#5912FF]"> communication</span>
              </h2>
              <p className="text-center sm:text-left mb-4 sm:mb-0">
                AV companies should not have to cold call and email for new
                clients, we set out to streamline new client lead-capture.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-8 mx-4">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-[#F5FBF1] px-8 py-8 rounded-lg">
            <div className="bg-[#B5F9C4] rounded-full w-32 mb-4">
              <p className="text-[#178751] text-[14px] text-center font-semibold px-4 py-1">
                Our Mission
              </p>
            </div>
            <h2 className="text-[25px] sm:text-[30px] leading-[3rem] text-[#111111]">
              Our mission is simplify the communication process on both sides,
              while creating a fair and competitive formula for new business.{" "}
            </h2>
          </div>

          <div className="bg-[#FBF1F6] px-8 py-8 rounded-lg">
            <div className="bg-[#F6BFDB] rounded-full w-32 mb-4">
              <p className="text-[#B83FC2] text-[14px] text-center font-semibold px-4 py-1">
                Our Vision
              </p>
            </div>

            <h2 className="text-[25px] sm:text-[30px] leading-[3rem] text-[#111111]">
              Create a platform where event managers can easily find av
              providers and vice versa; to change the old ways of new client
              capture.
            </h2>
          </div>
        </div>
      </section>
      {/* 
      <section className="mb-8 mx-4">
        <div className="flex justify-center items-center bg-primary text-white rounded-lg px-2 py-8 text-center">
          <div className="grid grid-cols-1 sm:grid-cols-4 w-full ">
            <div>
              <div className="mb-6 sm:mb-0">
                <h2>50</h2>
                <h6 className="font-normal">Meeting Planners</h6>
              </div>
            </div>

            <div>
              <div className="mb-6 sm:mb-0">
                <h2>200+</h2>
                <h6 className="font-normal">Event Listings</h6>
              </div>
            </div>
            <div>
              <div className="mb-6 sm:mb-0">
                <h2>300+</h2>
                <h6 className="font-normal">AV Companies</h6>
              </div>
            </div>
            <div>
              <div>
                <h2>200+</h2>
                <h6 className="font-normal">Proposals Sent</h6>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      <section className="bg-purple_two px-6 py-16 rounded-3xl mb-12 mx-4">
        <div className="flex items-center justify-center sm:justify-start">
          <div className="bg-[#B5F9C4] rounded-full w-max mb-4">
            <p className="text-[#178751] text-[14px] text-center font-semibold px-2 sm:px-4 py-1">
              We Can’t Wait For You To Try It!
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-white text-[35px] mb-4 text-center sm:text-left">
            Join us as we transform the AV industry — one event at a time.
          </h2>
          <div className="flex items-center justify-center sm:justify-start">
            <Link to="/events">
              <Button
                variant="filled"
                size="sm"
                className="lg:inline-block bg-primary rounded-btn py-3 px-6 "
              >
                <p className="text-white normal-case font-semibold text-[14px]">
                  See Events
                </p>
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default index;
