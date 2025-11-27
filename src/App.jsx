import React from 'react';
import { Outlet, Link } from 'react-router-dom';

export default function App(){
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <Link className="navbar-brand" to="/">My LMS</Link>
          <div>
            <Link className="btn btn-outline-primary me-2" to="/admin/login">Admin</Link>
          </div>
        </div>
      </nav>
      <div className="container mt-4">
        <Outlet />
      </div>
    </div>
  );
}
