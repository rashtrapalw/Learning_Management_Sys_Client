// import React from 'react';
// import { Outlet, Link } from 'react-router-dom';

// export default function App(){
//   return (
//     <div>
//       <nav className="navbar navbar-expand-lg navbar-light bg-light">
//         <div className="container">
//           <Link className="navbar-brand" to="/">My LMS</Link>
//           <div>
//             <Link className="btn btn-outline-primary me-2" to="/admin/login">Admin</Link>
//           </div>
//         </div>
//       </nav>
//       <div className="container mt-4">
//         <Outlet />
//       </div>
//     </div>
//   );
// }


// import React from "react";
// import { Outlet } from "react-router-dom";
// import Navbar from "./components/Navbar";
// import Home from "./pages/Home";

// export default function App() {
//   return (
//     <div>
//       <Navbar />
      

//       <div className="container my-2">
//         <Outlet />
//       </div>
//     </div>
//   );
// }




import React from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

// Pages
import Home from "./pages/Home";
import SubjectPage from "./pages/SubjectPage";
import DayPage from "./pages/DayPage";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";

export default function App() {
  return (
    <div>
      {/* Always visible */}
      <Navbar />
      {/* <Home /> */}

      {/* Page Routing */}
      {/* <div className="container my-2"> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/subject/:id" element={<SubjectPage />} />
          <Route path="/day/:id" element={<DayPage />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
      {/* </div> */}
    </div>
  );
}
