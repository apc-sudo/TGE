import React from 'react';
import { Outlet } from 'react-router-dom';
import AccessorySidebar from '../components/AccessorySidebar';
import MobileSidebarDrawer from '../components/MobileSidebarDrawer';
import RippleGrid from '../components/RippleGrid';
import ErrorBoundary from '../components/ErrorBoundary';

const AccessoryLayout = () => {
  return (
    <div
      className="relative min-h-screen bg-cover bg-center text-gray-800 overflow-x-hidden bg-white"
    >

      {/* Mobile drawer button (only shows on small screens) */}
      <div className="md:hidden mt-24 relative z-90">
        <MobileSidebarDrawer />
      </div>

      {/* Layout for medium and above screen sizes */}
      <div className="hidden md:flex mt-32 items-start relative z-10">
        <AccessorySidebar />
        <div className="w-full md:w-3/4 p-6">
          <Outlet />
        </div>
      </div>

      {/* On mobile, main content is full width */}
      <div className="md:hidden mt-4 px-4 relative z-10">
        <Outlet />
      </div>
    </div>
  );
};

export default AccessoryLayout;
