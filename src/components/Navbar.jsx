// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import "../styles/navbar.css";

// export default function Navbar() {
//   const [open, setOpen] = useState(false);

//   return (
//     <nav className="nav">
//       <div className="nav-container">

//         <Link className="nav-logo" to="/">My LMS</Link>

//         <div className="nav-toggle" onClick={() => setOpen(!open)}>
//           <span></span><span></span><span></span>
//         </div>

//         <div className={`nav-links ${open ? "open" : ""}`}>
//           <Link to="/admin/login" className="nav-btn">Admin</Link>
//         </div>
//       </div>
//     </nav>
//   );
// }



// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import "../styles/navbar.css";

// export default function Navbar() {
//   const [open, setOpen] = useState(false);

//   return (
//     <nav className="glass-nav">
//       <div className="nav-container">

//         <Link to="/" className="logo">Coading Library</Link>

//         <div
//           className={`nav-toggle ${open ? "active" : ""}`}
//           onClick={() => setOpen(!open)}
//         >
//           <span></span><span></span><span></span>
//         </div>






//         <div className={`nav-links ${open ? "open" : ""}`}>
//           <Link to="/admin/login" className="nav-btn">
//             Admin Login
//           </Link>
//         </div>

//       </div>
//     </nav>
//   );
// }


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

        <Link to="/" className="logo">Coading Library</Link>

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

        <div className={`nav-links ${open ? "open" : ""}`}>
          <Link to="/admin/login" className="nav-btn">
            Admin Login
          </Link>
        </div>

      </div>
    </nav>
  );
}
