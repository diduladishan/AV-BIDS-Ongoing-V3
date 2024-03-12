import { Outlet } from 'react-router-dom';
import { TopNav } from './top-nav';
function EmptyLayout() {
  return (
    <div className='w-full h-screen overflow-auto'>
      <TopNav />
      <Outlet />
    </div>
  );
}

export default EmptyLayout;
