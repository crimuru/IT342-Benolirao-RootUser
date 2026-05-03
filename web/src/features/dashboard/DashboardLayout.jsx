import React from 'react';
import Sidebar from './Sidebar'; // Use the reusable sidebar we discussed

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <div className="flex-1 ml-[260px] p-8">
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;