// src/components/Topbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Topbar = ({ toggleSidebar }) => {
  return (
    <div className="bg-white px-4 py-3 d-flex justify-content-between align-items-center border-bottom">
      {/* Hamburger for mobile */}
      <button className="btn btn-outline-secondary d-md-none" onClick={toggleSidebar}>
        <i className="bi bi-list fs-4"></i>
      </button>

      {/* Search or logo spacing */}
      <div className="flex-grow-1 text-center d-none d-md-block">
        <input
          type="text"
          className="form-control w-50 mx-auto"
          placeholder="Search"
        />
      </div>

      {/* Right side */}
      <div className="d-flex align-items-center gap-3">
        <Link to="/register" className="btn btn-outline-primary btn-sm">Register IPO</Link>
        <span className="fw-semibold">Hi, Vishal</span>
        <i className="bi bi-bell-fill text-warning fs-5"></i>
      </div>
    </div>
  );
};

export default Topbar;
