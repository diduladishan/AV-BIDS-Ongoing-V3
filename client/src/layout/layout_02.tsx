import { Outlet } from "react-router-dom";
import { NavbarDashboard } from "./NavbarDashboard";
import { Footer } from "./footer";

function Layout_02() {
  return (
    <>
      <main className="w-full h-screen overflow-auto bg-[#fff]">
        <div className="bg-[#fff] mb-2  fixed top-0 w-full z-50">
          <NavbarDashboard />
        </div>
        <Outlet />
        <Footer />
      </main>
    </>
  );
}

export default Layout_02;
