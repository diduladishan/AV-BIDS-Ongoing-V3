import { Button, MobileNav, Navbar } from "@material-tailwind/react";
import React from "react";
import { Link } from "react-router-dom";
import { useGetCurrentUser } from "../app/hooks/useUser";
import LOGO from "../assets/homepage/logo.png";
import ProfileMenu from "../components/profile-menu";
import Navbutton from "../assets/navigation bar/navbar_button.png";

export function TopNav() {
  const [openNav, setOpenNav] = React.useState(false);
  const user = useGetCurrentUser();

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Link to="/events">
        <p className="text-gray-600 font-medium">Events Page</p>
      </Link>
    </ul>
  );

  return (
    <Navbar className="mx-auto w-full py-2 px-4 lg:px-8 lg:py-4 shadow-none">
      <div className="mx-auto flex items-center justify-between text-blue-gray-900">
        <Link to="/" className="flex items-center">
          <img src={LOGO} className="w-24" alt="AV Bids" />
        </Link>
        <div className="hidden lg:block">{navList}</div>
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
                  <span className="text-black normal-case">Get Started</span>
                </Button>
              </Link>
            </>
          ) : (
            <ProfileMenu />
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
          className="h-6 w-6 hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          onClick={() => setOpenNav(!openNav)}
        />
      </div>
      <MobileNav open={openNav}>
        <div className="container mx-auto">
          <div className="text-center">{navList}</div>

          <div className="grid grid-cols-2 gap-2">
            <Link to="/sign-in">
              <Button
                variant="outlined"
                size="sm"
                fullWidth
                className="rounded-btn"
              >
                <span className="text-black">Login</span>
              </Button>
            </Link>

            <Link to="/sign-up">
              <Button
                variant="outlined"
                size="sm"
                fullWidth
                className="rounded-btn"
              >
                <span className="text-black">Get Started</span>
              </Button>
            </Link>
          </div>
        </div>
      </MobileNav>
    </Navbar>
  );
}
