import React, { useState } from 'react';

import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import DashboardTable from '../components/Dashboard/DashboardTable';

function Dashboard() {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            <div className="grid grid-cols-12">
              <DashboardTable />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;