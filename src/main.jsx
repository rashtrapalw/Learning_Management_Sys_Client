// import React from 'react';
// import { createRoot } from 'react-dom/client';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import App from './App';
// import Home from './pages/Home';
// import SubjectPage from './pages/SubjectPage';
// import DayPage from './pages/DayPage';
// import AdminLogin from './pages/AdminLogin';
// import AdminDashboard from './pages/AdminDashboard';


// createRoot(document.getElementById('root')).render(
//   <BrowserRouter>
//     <Routes>
//       <Route path="/" element={<App />}>
//         <Route index element={<Home />} />
//         <Route path="subject/:id" element={<SubjectPage />} />
//         <Route path="day/:id" element={<DayPage />} />
//         <Route path="admin/login" element={<AdminLogin />} />
//         <Route path="admin/dashboard" element={<AdminDashboard />} />
//       </Route>
//     </Routes>
//     {/* <h1>Welcome to LMS</h1> */}
//   </BrowserRouter>
// );



// ****************************************************************************************************


// import React from 'react';
// import { createRoot } from 'react-dom/client';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';

// import App from './App';

// // Pages
// import Home from './pages/Home';
// import SubjectPage from './pages/SubjectPage';
// import DayPage from './pages/DayPage';
// import AdminLogin from './pages/AdminLogin';
// import AdminDashboard from './pages/AdminDashboard';
// // import Navbar from './components/Navbar';

// createRoot(document.getElementById('root')).render(
//   <BrowserRouter>
  
//     <Routes>
     
      
//       {/* Layout */}
//       <Route path="/" element={<App />}>
//         {/* Routes inside layout */}
//         <Route index element={<Home />} />
//         <Route path="subject/:id" element={<SubjectPage />} />
//         <Route path="day/:id" element={<DayPage />} />
//         <Route path="admin/login" element={<AdminLogin />} />
//         <Route path="admin/dashboard" element={<AdminDashboard />} />
//       </Route>
//     </Routes>
//   </BrowserRouter>
// );


// ****************************************************************************************************



// main.jsx
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
