import { InboxArrowDownIcon, PowerIcon } from "@heroicons/react/24/solid";
import {
  Avatar,
  Badge,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Typography,
} from "@material-tailwind/react";
import React from "react";
import { MdNotificationsNone } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { clearUser } from "../app/features/user/userSlice";
import { useAppDispatch } from "../app/hooks";

import { useGetCurrentUser } from "../app/hooks/useUser";
import api from "../utils/api";

import Notification_bell from "./notification-bell";

function ProfileMenu() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const user = useGetCurrentUser();

  const closeMenu = () => setIsMenuOpen(false);

  const handleSignout = async () => {
    try {
      await api.post("/auth/logout");
      localStorage.removeItem("userInfo");
      dispatch(clearUser());
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const profileMenuItems = [
    {
      label: "Dashboard",
      icon: InboxArrowDownIcon,
      onClick: () => navigate("/dashboard"),
    },
    {
      label: "Inbox",
      icon: InboxArrowDownIcon,
      onClick: () => navigate("/messages"),
    },
    {
      label: "Sign Out",
      icon: PowerIcon,
      onClick: () => {
        handleSignout();
        closeMenu();
      },
    },
  ];

  return (
    <div className="flex items-center gap-6 cursor-pointer">
      {/* <Badge content="5" color="green">
        <MdNotificationsNone className="text-[#000000] text-[30px]" />
      </Badge> */}
      <Notification_bell />
      <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
        <MenuHandler>
          <div className="flex gap-2">
            <Avatar
              variant="circular"
              size="sm"
              alt="tania andrew"
              className="border border-gray-900 p-0.5"
              src={
                user?.imageUrl
                  ? `https://av-bids-bucket.s3.ap-south-1.amazonaws.com/${user?.imageUrl}`
                  : "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
              }
            />
          </div>
        </MenuHandler>
        <MenuList className="p-1">
          {profileMenuItems.map(({ label, icon, onClick }, key) => {
            const isLastItem = key === profileMenuItems.length - 1;
            const dynamicStyles = isLastItem
              ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
              : "";

            return (
              <MenuItem
                key={label}
                onClick={onClick}
                className={`flex items-center gap-2 rounded ${dynamicStyles}`}
              >
                {React.createElement(icon, {
                  className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                  strokeWidth: 2,
                })}
                <Typography
                  as="span"
                  variant="small"
                  className="font-normal"
                  color={isLastItem ? "red" : "inherit"}
                >
                  {label}
                </Typography>
              </MenuItem>
            );
          })}
        </MenuList>
      </Menu>
    </div>
  );
}

export default ProfileMenu;
