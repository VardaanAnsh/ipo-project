// src/components/Layout.jsx
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

const Layout = ({ children }) => {
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => setShowSidebar(!showSidebar);

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <div className={`sidebar-container bg-white shadow-sm ${showSidebar ? 'd-block' : 'd-none'} d-md-block`} style={{ width: "240px", minHeight: "100vh", position: "relative", zIndex: 1000 }}>
        <Sidebar />
      </div>

      {/* Content */}
      <div className="flex-grow-1" style={{ background: "#f8f9fa", minHeight: "100vh" }}>
        <Topbar toggleSidebar={toggleSidebar} />
        <div className="p-3">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
