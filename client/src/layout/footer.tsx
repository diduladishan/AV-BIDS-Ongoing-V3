import { Link } from "react-router-dom";
import LOGO from "../assets/logo_dark.png";

const currentYear = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="relative w-full px-8 py-16 bg-[#151045] text-white">
      <div className="mx-auto w-full max-w-7xl px-8">
        <div></div>

        {/* <div className="mx-auto grid w-full grid-cols-1 gap-8 py-12 sm:grid-cols-3 lg:grid-cols-5">
          <div className="sm:col-span-3 md:col-span-1">
            <img src={LOGO} alt="" className="mx-auto" />
            <Link to="/av_providers">
              <p className="text-sm text-center mt-4 sm:mb-8 md:mb-0">
                All Rights Reserved - 2023
              </p>
            </Link>
          </div>
          <div className="sm:hidden md:inline-block md:col-span-2 lg:col-span-1"></div>

          {SITEMAP.map(({ title, links }, key) => (
            <div key={key} className="w-full">
              <h4 className="mb-8 uppercase text-center md:text-left ">
                {title}
              </h4>
              <ul className="space-y-4 text-center md:text-left ">
                {links.map((link, key) => (
                  <p className="hover:underline transition ease-in-out duration-300 cursor-pointer">
                    {link}
                  </p>
                ))}
              </ul>
            </div>
          ))}
        </div> */}

        <div className="grid sm:grid-cols-3 md:grid-cols-5 gap-8 mb-4">
          <div className="mb-8 sm:col-span-3 md:col-span-2 sm:place-self-start ">
            <img src={LOGO} alt="" className="w-[140px]" />

            <p className="text-sm mt-4 sm:mb-8 md:mb-0">
              All Rights Reserved - {currentYear}
            </p>

            <Link to="/terms_of_service">
              <p className="text-sm mt-4 sm:mb-8 md:mb-0">Terms of Service</p>
            </Link>

            <Link to="/privacy_policy">
              <p className="text-sm mt-4 sm:mb-8 md:mb-0">Privacy Policy</p>
            </Link>
          </div>

          <div className="mb-6 text-center">
            <h4 className="mb-8 uppercase text-center">For Event Planners</h4>

            <Link to="/event-planner">
              <p className="hover:underline transition ease-in-out duration-300 cursor-pointer mb-4 ">
                How to get started
              </p>
            </Link>

            <Link to="/event-planner">
              <p className="hover:underline transition ease-in-out duration-300 cursor-pointer mb-4">
                FAQs
              </p>
            </Link>

            <Link to="/4_event_categories">
              <p className="hover:underline transition ease-in-out duration-300 cursor-pointer">
                Event Categories
              </p>
            </Link>
          </div>

          <div className="mb-6 text-center">
            <h4 className="mb-8 uppercase text-center ">For AV Providers</h4>

            <Link to="/av_providers">
              <p className="hover:underline transition ease-in-out duration-300 cursor-pointer mb-4">
                How to get started
              </p>
            </Link>

            <Link to="/av_providers">
              <p className="hover:underline transition ease-in-out duration-300 cursor-pointer mb-4">
                FAQs
              </p>
            </Link>

            <Link to="/4_event_categories">
              <p className="hover:underline transition ease-in-out duration-300 cursor-pointer">
                Event Categories
              </p>
            </Link>
          </div>

          <div className="text-center">
            <h4 className="mb-8 uppercase text-center ">AV Bids</h4>

            <Link to="/8_about_us">
              <p className="hover:underline transition ease-in-out duration-300 cursor-pointer mb-4">
                About us
              </p>
            </Link>

            <Link to="/contact-us">
              <p className="hover:underline transition ease-in-out duration-300 cursor-pointer mb-4">
                Contact us
              </p>
            </Link>

            <Link to="/3_services">
              <p className="hover:underline transition ease-in-out duration-300 cursor-pointer">
                Services
              </p>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
