import { Button, MobileNav, Navbar } from "@material-tailwind/react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { clearUser } from "../app/features/user/userSlice";
import { useAppDispatch } from "../app/hooks";
import { useGetCurrentUser } from "../app/hooks/useUser";
import LOGO from "../assets/homepage/logo.png";
import Navbutton from "../assets/navigation bar/navbar_button.png";
import PLUS_ICON from "../assets/navigation bar/plus.png";
import navigation_bg from "../assets/navigation bar/nav_toggle_img.png";
import ProfileMenu from "../components/profile-menu";
import api from "../utils/api";
import { useState, useEffect } from "react";

import NotificationBell from "../components/notification-bell";
export function TopNav() {
  // starts here
  const slides = [
    {
      mainText: "For Event Planners",
      additionalText:
        "Connecting AV providers and event managers for fairer quotes and networking on a specialized events industry platform.",
    },
    {
      mainText: "For AV Providers",
      additionalText:
        "Unique events industry listing connects AV providers with planners, facilitating client acquisition without cold calling.",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  const handleDotClick = (index: number) => {
    setCurrentSlide(index);
  };

  // ends here

  const user = useGetCurrentUser();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [openNav, setOpenNav] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const handleSignout = async () => {
    try {
      await api.post("/auth/logout");
      await dispatch(clearUser());
      // await dispatch(setStep(1));
      // await dispatch(clearAll());
      navigate("/");
      localStorage.removeItem("userInfo");
    } catch (error) {
      console.error(error);
    }
  };

  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Link to="/events">
        <p className="text-[#2D3648] font-bold text-center">Events</p>
      </Link>
    </ul>
  );

  return (
    <div className="bg-[#f9f8ff]">
      <Navbar className="mx-auto w-full py-2 px-4 lg:px-8 lg:py-2 shadow-none bg-[#f9f8ff] border-none">
        <div className="mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <img src={LOGO} className="w-36" alt="AV Bids" />
          </Link>
          <div className="flex items-center gap-10">
            {user && user?.userType === "PLANNER" && (
              <Button
                variant="outlined"
                size="sm"
                className="hidden lg:block rounded-btn "
                onClick={() => navigate("/events/new")}
              >
                <div className="flex items-center gap-2">
                  <img src={PLUS_ICON} alt="aad" className="object-contain" />
                  <span className="text-black normal-case">Post New Event</span>
                </div>
              </Button>
            )}
            <div className="hidden lg:block">{navList}</div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex-grow" />
            {!user ? (
              <>
                <Link to="/sign-in">
                  <Button
                    variant="text"
                    size="sm"
                    className="hidden lg:inline-block text-btn"
                  >
                    <span className="text-black normal-case">Login</span>
                  </Button>
                </Link>

                <Link to="/sign-up">
                  <Button
                    variant="outlined"
                    size="sm"
                    className="hidden lg:inline-block rounded-btn"
                  >
                    <p className="text-black normal-case font-bold">
                      Get Started
                    </p>
                  </Button>
                </Link>
              </>
            ) : (
              <div className="hidden md:block lg:block">
                <ProfileMenu />
              </div>
            )}
          </div>
          {/* <IconButton
        variant="text"
        className="ml-auto h-6 w-6 text-primary bg-[#000] hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
        ripple={false}
        onClick={() => setOpenNav(!openNav)}
      >
        <></>
      </IconButton> */}
          <img
            src={Navbutton}
            alt="navbar_toggle"
            className="h-6 w-6 flex items-center hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
            onClick={() => setOpenNav(!openNav)}
          />
        </div>

        <MobileNav open={openNav}>
          <div className="container mx-auto h-full">
            {/* <div className='text-center'>{navList}</div> */}
            {!user && (
              <div className="grid grid-cols-1 mb-0.5">
                {/* <Link to="/sign-in">
              <Button
                variant="outlined"
                size="sm"
                fullWidth
                className="rounded-btn"
              >
                <span className="text-black">Login</span>
              </Button>
            </Link> */}
                <div className="flex items-center justify-center">
                  <img
                    src={navigation_bg}
                    className="w-[200px]"
                    alt="mobile navogation bar img"
                  />
                </div>

                <div className="relative">
                  <div className="w-full h-40 bg-[#fff] flex flex-col items-center justify-center transition-opacity duration-500">
                    <p className="text-xl font-bold text-[#3c3c3c]">
                      {slides[currentSlide].mainText}
                    </p>
                    <p className="text-sm opacity-100 text-[#a6a6a6] text-center mt-2 px-2">
                      {slides[currentSlide].additionalText}
                    </p>
                  </div>

                  <div className="absolute bottom-2 flex items-center justify-center w-full">
                    {slides.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => handleDotClick(index)}
                        className={`w-3 h-3 mx-1 rounded-full bg-gray-500 ${
                          currentSlide === index ? "!bg-[#957fef]" : ""
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* <Button
                variant="outlined"
                size="sm"
                fullWidth
                className="rounded-btn"
              >
                <span className="text-black">Login</span>
              </Button> */}

                <Link to="/sign-up">
                  <div className="w-full text-center bg-[#957fef] py-2 px-2 mb-4 rounded-xl mt-4">
                    <p>Sign Up</p>
                  </div>
                </Link>

                <p className="text-[#3c3c3c] font-medium text-center mb-2">
                  Already have an account?
                  <Link to="/sign-in">
                    {" "}
                    <span className="text-[#957fef] ">Sign in</span>
                  </Link>
                </p>

                {/* <Link to="/sign-up">
              <Button
                variant="outlined"
                size="sm"
                fullWidth
                className="rounded-btn"
              >
                <span className="text-black">Get Started</span>
              </Button>
            </Link> */}
              </div>
            )}
            {user && (
              <div className="mt-2 bg-[#f0f1f1] py-2 px-2 rounded-lg">
                {/* <Link to="/events">
              <Button
                variant="outlined"
                size="sm"
                fullWidth
                className="rounded-btn"
              >
                <span className="text-black">View Events</span>
              </Button>
            </Link> */}
                {/* <Button
              variant="outlined"
              size="sm"
              fullWidth
              className="rounded-btn"
              onClick={() => handleSignout()}
            >
              <span className="text-black">Logout</span>
            </Button> */}

                <div className="flex items-center justify-between">
                  <Link to="/events">
                    <p className="text-[#414e62] font-medium border border-[#181059] bg-[#fff] py-1 px-2 rounded-lg text-[14px]">
                      View Events
                    </p>
                  </Link>

                  <ProfileMenu />
                </div>
              </div>
            )}
          </div>
        </MobileNav>
      </Navbar>
    </div>
  );
}
