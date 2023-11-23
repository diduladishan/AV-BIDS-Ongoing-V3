import {
  Bars2Icon,
  ChevronDownIcon,
  Cog6ToothIcon,
  InboxArrowDownIcon,
  LifebuoyIcon,
  PowerIcon,
  UserCircleIcon,
} from '@heroicons/react/24/solid';
import {
  Avatar,
  Button,
  IconButton,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Navbar,
  Typography,
} from '@material-tailwind/react';
import React from 'react';

import { useNavigate } from 'react-router-dom';
import { clearUser } from '../app/features/user/userSlice';
import { useAppDispatch } from '../app/hooks';
import NOTIFICATION_ICON from '../assets/navigation bar/bell.png';
import PLUS_ICON from '../assets/navigation bar/plus.png';
import api from '../utils/api';
import { useGetCurrentUser } from '../app/hooks/useUser';

function ProfileMenu() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  const handleSignout = async () => {
    try {
      await api.post('/auth/logout');
      localStorage.removeItem('userInfo');
      dispatch(clearUser());
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  // profile menu component
  const profileMenuItems = [
    {
      label: 'My Profile',
      icon: UserCircleIcon,
      onClick: () => {},
    },
    {
      label: 'Edit Profile',
      icon: Cog6ToothIcon,
      onClick: () => {},
    },
    {
      label: 'Inbox',
      icon: InboxArrowDownIcon,
      onClick: () => {},
    },
    {
      label: 'Help',
      icon: LifebuoyIcon,
      onClick: () => {},
    },
    {
      label: 'Sign Out',
      icon: PowerIcon,
      onClick: () => {
        handleSignout();
        closeMenu();
      },
    },
  ];

  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement='bottom-end'>
      <MenuHandler>
        <Button
          variant='text'
          color='blue-gray'
          className='flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto'
        >
          <div className='flex gap-2'>
            <img src={NOTIFICATION_ICON} alt='aad' className='object-contain' />
            <Avatar
              variant='circular'
              size='sm'
              alt='tania andrew'
              className='border border-gray-900 p-0.5'
              src='https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80'
            />
          </div>

          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform ${
              isMenuOpen ? 'rotate-180' : ''
            }`}
          />
        </Button>
      </MenuHandler>
      <MenuList className='p-1'>
        {profileMenuItems.map(({ label, icon, onClick }, key) => {
          const isLastItem = key === profileMenuItems.length - 1;
          return (
            <MenuItem
              key={label}
              onClick={onClick}
              className={`flex items-center gap-2 rounded ${
                isLastItem
                  ? 'hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10'
                  : ''
              }`}
            >
              {React.createElement(icon, {
                className: `h-4 w-4 ${isLastItem ? 'text-red-500' : ''}`,
                strokeWidth: 2,
              })}
              <Typography
                as='span'
                variant='small'
                className='font-normal'
                color={isLastItem ? 'red' : 'inherit'}
              >
                {label}
              </Typography>
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
}

// nav list component

export function NavbarDashboard() {
  const navigate = useNavigate();
  const [isNavOpen, setIsNavOpen] = React.useState(false);

  const user = useGetCurrentUser()

  const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);

  React.useEffect(() => {
    window.addEventListener(
      'resize',
      () => window.innerWidth >= 960 && setIsNavOpen(false)
    );
  }, []);

  return (
    <div>
      <div className='w-full'>
        <Navbar className='mx-auto max-w-screen-xl p-2 lg:pl-6 bg-[#f7f6fd] shadow-none border-none py-6'>
          <div className='relative mx-auto flex items-center justify-between text-blue-gray-900'>
            {user?.userType === 'PLANNER' && (
            <Button
              variant='outlined'
              size='sm'
              className='hidden lg:inline-block rounded-btn '
              onClick={() => navigate('/events/new')}
            >
              <div className='flex items-center gap-2'>
                <img src={PLUS_ICON} alt='aad' className='object-contain' />
                <span className='text-black normal-case'>Post New Event</span>
              </div>
            </Button>
            )}
            <div className='hidden lg:block'></div>
            <IconButton
              size='sm'
              color='blue-gray'
              variant='text'
              onClick={toggleIsNavOpen}
              className='ml-auto mr-2 lg:hidden'
            >
              <Bars2Icon className='h-6 w-6' />
            </IconButton>

            {/* <Button size="sm" variant="text">
              <span>Log In</span>
            </Button> */}

            <ProfileMenu />
          </div>
        </Navbar>
      </div>
    </div>
  );
}
