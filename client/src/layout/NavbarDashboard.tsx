import { Bars2Icon } from "@heroicons/react/24/solid";
import {
  Button,
  IconButton,
  Navbar,
  MobileNav,
} from "@material-tailwind/react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

import { useGetCurrentUser } from "../app/hooks/useUser";
import PLUS_ICON from "../assets/navigation bar/plus.png";
import ProfileMenu from "../components/profile-menu";
import navigation_bg from "../assets/navigation bar/nav_toggle_img.png";
import { MdAddCircleOutline } from "react-icons/md";

// nav list component
export function NavbarDashboard() {
  const navigate = useNavigate();
  const [isNavOpen, setIsNavOpen] = React.useState(false);

  const user = useGetCurrentUser();

  const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setIsNavOpen(false)
    );
  }, []);

  const navList = (
    <ul className="flex justify-center flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <div className="hidden sm:block">
        <Link to="/events">
          <p className="text-black font-bold">Events</p>
        </Link>
      </div>

      <div className="block sm:hidden flex items-center justify-center ml-8">
        {/* <Button
          variant="outlined"
          size="sm"
          className="lg:inline-block rounded-btn"
          onClick={() => navigate("/events/new")}
        >
          <div className="flex items-center gap-2">
            <MdAddCircleOutline className="text-[18px] text-white" />
            <span className="text-white normal-case ">Post New Event</span>
          </div>
        </Button> */}

        <div
          className="flex items-center justify-center gap-2 border border-white w-max px-2 py-1 rounded-lg block sm:hidden ml-8"
          onClick={() => navigate("/events/new")}
        >
          <MdAddCircleOutline className="text-[18px] text-black" />
          <span className="text-black normal-case text-[12px]">
            Post New Event
          </span>
        </div>
      </div>
    </ul>
  );

  return (
    <div>
      <div className="w-full">
        <Navbar className="mx-auto max-w-screen-xl p-2 lg:pl-6 bg-[#f7f6fd] shadow-none border-none sm:py-4">
          <div className="relative mx-auto flex items-center justify-between text-blue-gray-900">
            {user && user?.userType === "PLANNER" && (
              // <Button
              //   variant="outlined"
              //   size="sm"
              //   className="lg:inline-block rounded-btn hidden sm:block"
              //   onClick={() => navigate("/events/new")}
              // >
              //   <div className="flex items-center gap-2">
              //     <img
              //       src={PLUS_ICON}
              //       alt="plus icon"
              //       className="object-contain"
              //     />
              //     <span className="text-white normal-case ">
              //       Post New Event
              //     </span>
              //   </div>
              // </Button>

              <div className="hidden lg:block">
                <div
                  className="flex items-center justify-center gap-2 border border-black w-max px-2 py-1 rounded-lg cursor-pointer"
                  onClick={() => navigate("/events/new")}
                >
                  <MdAddCircleOutline className="text-[18px] sm:text-[20px] text-black text-center" />
                  <span className="text-black normal-case text-[12px] sm:text-[16px]">
                    Post New Event
                  </span>
                </div>
              </div>
            )}

            <div className="lg:block flex-grow text-center">{navList}</div>

            {user ? (
              <>
                {/* <IconButton
                  size="sm"
                  color="blue-gray"
                  variant="text"
                  onClick={toggleIsNavOpen}
                  className="ml-auto mr-2 lg:hidden"
                >
                  <Bars2Icon className="h-6 w-6" />
                </IconButton> */}
                <ProfileMenu />
              </>
            ) : (
              <div className="lg:flex lg:items-center lg:justify-end">
                <Button
                  variant="text"
                  size="sm"
                  className="lg:inline-block text-btn"
                >
                  <Link to="/sign-in">
                    <span className="text-black">Login</span>
                  </Link>
                </Button>
                <Button
                  variant="outlined"
                  size="sm"
                  className="lg:inline-block rounded-btn ml-2"
                >
                  <Link to="/sign-up">
                    <span className="text-black">Get Started</span>
                  </Link>
                </Button>
              </div>
            )}
          </div>

          {/* starts here  */}
          {/* <MobileNav open={isNavOpen}>
            <div className="container mx-auto">
              {navList}
              <div className="flex items-center gap-x-1">
                <Button fullWidth variant="text" size="sm" className="">
                  <span>Log In</span>
                </Button>
                <Button fullWidth variant="gradient" size="sm" className="">
                  <span>Sign in</span>
                </Button>
              </div>
            </div>
          </MobileNav> */}
          {/* ends here */}
        </Navbar>
      </div>
    </div>
  );
}
