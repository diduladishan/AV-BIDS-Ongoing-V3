import React from "react";
import { Button } from "@material-tailwind/react";
import eventCategories from "../../assets/4_event_categories/event_categories_01.png";
import eventCategories_02 from "../../assets/4_event_categories/event_categories_02.png";
import { MdArrowForward } from "react-icons/md";
import { MdEast } from "react-icons/md";
import { MdBrightness1 } from "react-icons/md";
import { Link } from "react-router-dom";

function index() {
  return (
    <div className="mx-auto">
      <section className="mb-4 sm:mb-12">
        <div className="text-primary bg-[#F3F1FB] text-center py-16">
          <h2>Event Categories</h2>
        </div>
      </section>

      <section className=" px-4 mb-8 sm:mb-24">
        <div className="flex justify-center items-center">
          <div className="grid md:grid-cols-2 gap-4 content-center ">
            <div className="mx-auto flex justify-center items-center">
              <div>
                <div className="flex items-center block sm:hidden mb-4">
                  <img
                    src={eventCategories}
                    alt="Event categories page main img"
                    className="w-full object-contain"
                  />
                </div>
                <h2 className="text-primary text-2xl mb-8 text">
                  Corporate Event Categories
                </h2>
                <div className="sm:flex gap-8 sm:mb-6  items-center justify-center">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <MdBrightness1 className="text-purple_two mb-0.5 text-[8px]" />
                      <p className="font-bold text-[#000]">Awards</p>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <MdBrightness1 className="text-purple_two mb-0.5 text-[8px]" />
                      <p className="font-bold text-[#000]">Banquet</p>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <MdBrightness1 className="text-purple_two mb-0.5 text-[8px]" />
                      <p className="font-bold text-[#000]">Board Meeting</p>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <MdBrightness1 className="text-purple_two mb-0.5 text-[8px]" />
                      <p className="font-bold text-[#000]">Breakout Session</p>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <MdBrightness1 className="text-purple_two mb-0.5 text-[8px]" />
                      <p className="font-bold text-[#000]">Conference</p>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <MdBrightness1 className="text-purple_two mb-0.5 text-[8px]" />
                      <p className="font-bold text-[#000]">Congress</p>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <MdBrightness1 className="text-purple_two mb-0.5 text-[8px]" />
                      <p className="font-bold text-[#000]">Consumer Trade </p>
                    </div>
                  </div>
                  <div className="">
                    <div className="flex items-center gap-2 mb-2">
                      <MdBrightness1 className="text-purple_two mb-0.5 text-[8px]" />
                      <p className="font-bold text-[#000]">Holiday Party</p>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <MdBrightness1 className="text-purple_two mb-0.5 text-[8px]" />
                      <p className="font-bold text-[#000]">
                        Industry and Consumer <br></br>Trade Show
                      </p>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <MdBrightness1 className="text-purple_two mb-0.5 text-[8px]" />
                      <p className="font-bold text-[#000]">
                        Industry Trade Show
                      </p>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <MdBrightness1 className="text-purple_two mb-0.5 text-[8px]" />
                      <p className="font-bold text-[#000]">
                        International Meeting
                      </p>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <MdBrightness1 className="text-purple_two mb-0.5 text-[8px]" />
                      <p className="font-bold text-[#000]">Networking</p>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <MdBrightness1 className="text-purple_two mb-0.5 text-[8px]" />
                      <p className="font-bold text-[#000]">Plenary General </p>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <MdBrightness1 className="text-purple_two mb-0.5 text-[8px]" />
                    <p className="font-bold text-[#000]">Product Launch</p>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <MdBrightness1 className="text-purple_two mb-0.5 text-[8px]" />
                    <p className="font-bold text-[#000]">Reception</p>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <MdBrightness1 className="text-purple_two mb-0.5 text-[8px]" />
                    <p className="font-bold text-[#000]">Retreat</p>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <MdBrightness1 className="text-purple_two mb-0.5 text-[8px]" />
                    <p className="font-bold text-[#000]">Seminar</p>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <MdBrightness1 className="text-purple_two mb-0.5 text-[8px]" />
                    <p className="font-bold text-[#000]">Workshop</p>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <MdBrightness1 className="text-purple_two mb-0.5 text-[8px]" />
                    <p className="font-bold text-[#000]">Press </p>
                  </div>

                  <div className="flex items-center justify-center sm:justify-start">
                    <Link to="/events">
                      <Button
                        variant="filled"
                        size="sm"
                        className="lg:inline-block bg-primary rounded-btn py-3 px-6 mt-6"
                      >
                        <div className="flex items-center">
                          <p className="text-white normal-case font-semibold text-[12px] sm:text-[14px]">
                            View Corporate Events
                          </p>
                          {/* <MdArrowForward
                            size={20}
                            className="text-[#fff] ml-4"
                          /> */}
                        </div>
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center hidden sm:block">
              <img
                src={eventCategories}
                alt="Event categories page main img"
                className="w-full object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mb-8 px-4">
        <div className="flex justify-center items-center">
          <div className="grid md:grid-cols-2 sm:gap-32 gap-6 content-center">
            <div>
              <div>
                <img
                  src={eventCategories_02}
                  alt="Event categories section two img"
                  className="w-full object-contain"
                />
              </div>
            </div>

            <div className="flex justify-center items-center">
              <div>
                <h2 className="text-primary text-2xl mb-8 text-center">
                  Non-Corporate Event Categories
                </h2>
                <div className="sm:flex items-center gap-8 ">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <MdBrightness1 className="text-purple_two mb-0.5 text-[8px]" />
                      <p className="font-bold text-[#000]">Charity Event </p>
                    </div>

                    <div className="flex items-center gap-2 mb-2">
                      <MdBrightness1 className="text-purple_two mb-0.5 text-[8px]" />
                      <p className="font-bold text-[#000]">Exhibition </p>
                    </div>

                    <div className="flex items-center gap-2 mb-2">
                      <MdBrightness1 className="text-purple_two mb-0.5 text-[8px]" />
                      <p className="font-bold text-[#000]">Fashion Show </p>
                    </div>

                    <div className="flex items-center gap-2 mb-2">
                      <MdBrightness1 className="text-purple_two mb-0.5 text-[8px]" />
                      <p className="font-bold text-[#000]">Festival</p>
                    </div>

                    <div className="flex items-center gap-2 mb-2">
                      <MdBrightness1 className="text-purple_two mb-0.5 text-[8px]" />
                      <p className="font-bold text-[#000]">Function </p>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <MdBrightness1 className="text-purple_two mb-0.5 text-[8px]" />
                      <p className="font-bold text-[#000]">Fundraiser </p>
                    </div>

                    <div className="flex items-center gap-2 mb-2">
                      <MdBrightness1 className="text-purple_two mb-0.5 text-[8px]" />
                      <p className="font-bold text-[#000]">Meetups </p>
                    </div>

                    <div className="flex items-center gap-2 mb-2">
                      <MdBrightness1 className="text-purple_two mb-0.5 text-[8px]" />
                      <p className="font-bold text-[#000]">
                        Sports/Competition{" "}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 mb-2">
                      <MdBrightness1 className="text-purple_two mb-0.5 text-[8px]" />
                      <p className="font-bold text-[#000]">Wedding </p>
                    </div>

                    <div className="flex items-center gap-2 mb-2">
                      <MdBrightness1 className="text-purple_two mb-0.5 text-[8px]" />
                      <p className="font-bold text-[#000]">Worship Service</p>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-center sm:justify-start">
                    <Button
                      variant="filled"
                      size="sm"
                      className="lg:inline-block bg-primary rounded-btn py-3 px-6 mt-6"
                    >
                      <div className="flex items-center">
                        <p className="text-white normal-case font-semibold text-[12px] sm:text-[14px]">
                          View Non-Corporate Events
                        </p>
                        {/* <MdArrowForward
                          size={20}
                          className="text-[#fff] ml-4"
                        /> */}
                      </div>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default index;
