
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    setSearch(e.target.value);
    navigate(`/?q=${e.target.value}`);
  };

  return (
    <nav className="glass-nav">
      <div className="nav-container">

        <Link to="/" className="logo">Recording Library</Link>

        {/* SEARCHBAR */}
        <input
          type="text"
          value={search}
          onChange={handleSearch}
          placeholder="Search subjects..."
          className="nav-search"
        />

        <div
          className={`nav-toggle ${open ? "active" : ""}`}
          onClick={() => setOpen(!open)}
        >
          <span></span><span></span><span></span>
        </div>

        {/* <div className={`nav-links ${open ? "open" : ""}`}>
          <Link to="/admin/login" className="nav-btn">
            Admin Login
          </Link>
        </div>

      <div className={`nav-links ${open ? "open" : ""}`}>
        <Link to="/user/login" className="nav-btn">
          User Login
        </Link>
      </div>

      <div className={`nav-links ${open ? "open" : ""}`}>
        <Link to="/user/register" className="nav-btn">
          Register
        </Link>
        </div> */}

    <Link to="/login" className="nav-btn">
        Login
      </Link>


        

      </div>
    </nav>
  );
}
