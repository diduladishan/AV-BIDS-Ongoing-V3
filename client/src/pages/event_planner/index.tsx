import React from "react";
import { Button } from "@material-tailwind/react";
import Event_main_img from "../../assets/event planner/Add User-rafiki 1 new.png";
import Create_account from "../../assets/event planner/create your account.png";
import Post_event from "../../assets/event planner/post an event.png";
import Choose_proposal from "../../assets/event planner/choose the best proposal.png";
import Done_Icon from "../../assets/AV Providers/done-icon.png";
import { Link } from "react-router-dom";
import Accordion from "./components/AccordionCustomIcon";

function Index() {
  return (
    // <div>event_planner</div>

    <div>
      <section className="mb-10 md:mb-16 grid md:grid-cols-2 content-center bg-secondary">
        <div className="md:px-8 lg:px-16 flex flex-col justify-center items-center md:items-start text-center md:text-left  p-8 pt-12  md:pt-8">
          <div className="bg-[#B5F9C4] rounded-full mb-4">
            <p className="text-[#178751] font-semibold px-4 py-1.5 text-center">
              For Event Managers
            </p>
          </div>
          <h2 className="text-[#000] font-extrabold">
            Why post your events on AV Bids?
          </h2>
          <p className="text-[#000] font-bold my-4">
            We are a unique listing site that is specific to the events
            industry. We created a platform that connects av providers to event
            managers to not only get a fairer quote, but to network and develop
            new business relationships.
          </p>

          <div className="flex flex-col gap-3 mb-6">
            <div className="flex gap-3">
              <img
                src={Done_Icon}
                alt="Done icon for paragraphs"
                className="w-[20px] object-contain"
              />
              <p className="text-[#fff] text-left font-medium">
                Always free for event managers to post events
              </p>
            </div>

            <div className="flex  gap-3">
              <img
                src={Done_Icon}
                alt="Done icon for paragraphs"
                className="w-[20px] object-contain"
              />
              <p className="text-[#fff] text-left font-medium">
                Add up to two members for your organization for free
              </p>
            </div>

            <div className="flex  gap-3">
              <img
                src={Done_Icon}
                alt="Done icon for paragraphs"
                className="w-[20px] object-contain"
              />
              <p className="text-[#fff] text-left font-medium">
                Chat with and check portfolios of av providers you want to work
                with
              </p>
            </div>
          </div>

          <Link to="/sign-in">
            <Button
              variant="filled"
              color="indigo"
              size="sm"
              className="rounded-md w-34 py-3 mt-2 px-4 bg-primary font-poppins"
            >
              <span className="text-white normal-case">Get Started</span>
            </Button>
          </Link>
        </div>

        <div className="flex items-center justify-self-center">
          <img
            src={Event_main_img}
            alt="Event planner main img"
            className="w-[600px] py-12 object-scale-down"
          />
        </div>
      </section>

      <div className="container mx-auto">
        <section className="mb-12">
          <div className="flex items-center justify-center">
            <div className="bg-[#B5F9C4] rounded-full w-36 mb-4">
              <p className="text-[#178751] text-center font-semibold px-4 py-1">
                Our Process
              </p>
            </div>
          </div>

          <div>
            <h2 className=" text-center mb-4 text-[#181059]">
              How to get started?
            </h2>
            <div className="font-poppins font-normal text-[#353535] text-center mb-8 mx-4 sm:mx-0">
              We make it simple and easy to start getting more proposals sent to
              you without having to reach out independently yourself
            </div>

            <div>
              <div className="grid md:grid-cols-3 gap-8  px-4 sm:px-8">
                <div className="bg-[#F3F1FB] rounded-xl py-8">
                  <div className="">
                    <div className="flex justify-center align-items">
                      <img
                        src={Create_account}
                        alt="Create your account img"
                        className="w-[330px]"
                      />
                    </div>
                    <div className="text-center font-poppins font-bold text-[23px] text-[#000000] mb-4">
                      create your account
                    </div>
                    <div className="text-center font-poppins font-normal  text-[#353535] p-4 px-8 pt-0">
                      Add as much detail about you or your organization as you
                      want. You can even add additional members who will have
                      access to your account.
                    </div>
                  </div>
                </div>

                <div className="bg-[#F3F1FB] rounded-xl py-8">
                  <div className="flex justify-center align-items">
                    <img
                      src={Post_event}
                      alt="post an event img"
                      className="w-[330px]"
                    />
                  </div>
                  <div className="text-center font-poppins font-bold text-[23px] text-[#000000] mb-4">
                    Post an event
                  </div>
                  <div className="text-center font-poppins font-normal  text-[#353535] p-4 px-8 pt-0">
                    Put in as much info about your event as you wish. We offer a
                    variety of input boxes about your event. If we are missing
                    anything or you already your event info on a document, you
                    can upload your document.
                  </div>
                </div>

                <div className="bg-[#F3F1FB] rounded-xl py-8">
                  <div className="flex justify-center align-items">
                    <img
                      src={Choose_proposal}
                      alt="choose proposal img"
                      className="w-[330px]"
                    />
                  </div>
                  <div className="text-center font-poppins font-bold text-[23px] text-[#000000] mb-4">
                    Choose the best proposal
                  </div>
                  <div className="text-center font-poppins font-normal  text-[#353535] p-4 px-8 pt-0">
                    After you post you event, you can expect multiple proposals
                    to be submit to you. From here you can determine if you want
                    the lowest bid or best value.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className=" my-8 px-2" id="faqSection">
          <div className="px-8">
            <h2 className="text-primary text-center mb-4">
              Frequently Asked Questions
            </h2>

            <Accordion />
          </div>
        </section>
      </div>
    </div>
  );
}

export default Index;
