import { Drawer, IconButton } from "@material-tailwind/react";
import React from "react";
import { Outlet } from "react-router-dom";
import MENU_BAR from "../assets/sidebar/menu.png";
import { NavbarDashboard } from "./NavbarDashboard";
import SidebarDashboard from "./Sidebar_dashboard";
import { MdDesktopWindows } from "react-icons/md";

const HomeLayout = () => {
  const [open, setOpen] = React.useState(false);

  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);

  return (
    <>
      <main className="w-full h-screen overflow-auto bg-[#f7f6fd]">
        {/* <main className="w-full h-screen  bg-[#f7f6fd]"> */}
        <div className="bg-[#f7f6fd] mb-2  fixed top-0 w-full z-50">
          <NavbarDashboard />
        </div>

        <div className="block lg:hidden">
          <React.Fragment>
            {/* <Button onClick={openDrawer}>Open Drawer</Button> */}
            <div className="bg-[#555544]" onClick={openDrawer}>
              <img
                src={MENU_BAR}
                alt="aad"
                className="w-[22px] fixed top-0 z-50 my-[15px] mx-2"
              />
            </div>

            <Drawer open={open} onClose={closeDrawer} className="p-1 w-min ">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <IconButton
                    variant="text"
                    color="blue-gray"
                    onClick={closeDrawer}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="h-5 w-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </IconButton>
                  <div onClick={closeDrawer}>
                    <SidebarDashboard />
                  </div>
                </div>
              </div>
            </Drawer>
          </React.Fragment>
        </div>

        <div className="flex mt-24">
          <div className="hidden lg:block">
            <SidebarDashboard />
          </div>

          <Outlet />
        </div>
      </main>
    </>
  );
};

export default HomeLayout;
