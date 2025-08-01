// src/components/Sidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="bg-white shadow-sm" style={{ width: "240px", minHeight: "100vh" }}>
      <div className="p-4 border-bottom">
        <h5 className="fw-bold text-primary">Bluestock Fintech</h5>
      </div>
      <ul className="nav flex-column p-3">
        <li className="nav-item mb-2"><Link to="/" className="nav-link text-dark">📊 Dashboard</Link></li>
        <li className="nav-item mb-2"><Link to="/" className="nav-link text-dark">📋 Manage IPO</Link></li>
        <Link to="/subscription" className="nav-link text-dark mb-2">🧾 IPO Subscription</Link>
        <Link to="/allotment" className="nav-link text-dark mb-2">🎯 IPO Allotment</Link>
        <hr />
        <Link to="/settings" className="nav-link text-dark mb-2">⚙️ Settings</Link>
        <Link to="/api-manager" className="nav-link text-dark mb-2">🔐 API Manager</Link>
        <Link to="/accounts" className="nav-link text-dark mb-2">👤 Accounts</Link>
        <Link to="/help" className="nav-link text-dark">❓ Help</Link>

      </ul>
    </div>
  );
};

export default Sidebar;
