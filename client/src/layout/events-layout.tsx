import { Outlet } from 'react-router-dom';
import { TopNav } from './top-nav';
import { Footer } from './footer';

function EventLayout() {
  return (
    <>
      <main className='w-full h-screen overflow-auto bg-[#f9f8ff]'>
        <TopNav />
        <Outlet />
        <Footer />
      </main>
      {/* <div className="w-full h-screen bg-gray-100 overflow-y-auto style-scroll">

      <div className="min-h-screen flex flex-col pt-20 ">
        <div className="flex-grow">
          <Outlet />
        </div>
      </div>
  
    </div> */}
    </>
  );
}

export default EventLayout;
