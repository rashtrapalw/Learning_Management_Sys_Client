

// ***************************************************************************************


import React from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

// Pages
import Home from "./pages/Home";
import SubjectPage from "./pages/SubjectPage";
import DayPage from "./pages/DayPage";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";

// User Pages
import UserRegister from "./user/Register";
import UserLogin from "./user/Login";
import UserDashboard from "./user/UserDashboard";
import AddVideo from "./user/AddVideo";

// Protected Route
import ProtectedUserRoute from "./components/ProtectedRoute";

// auth screen  
import AuthScreen from "./pages/AuthScreen";

export default function App() {
  return (
    <div>
      <Navbar />

      <Routes>
        
        {/* Public pages */}
        <Route path="/" element={<Home />} />
         
        <Route path="/subject/:id" element={<SubjectPage />} />
        <Route path="/day/:id" element={<DayPage />} />

        <Route path="/login" element={<AuthScreen />} />

        {/* Admin */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />

        {/* User Authentication */}
        <Route path="/user/register" element={<UserRegister />} />
        <Route path="/user/login" element={<UserLogin />} />

        {/* User Dashboard (Protected) */}
        <Route
          path="/user/dashboard"
          element={
            <ProtectedUserRoute>
              <UserDashboard />
            </ProtectedUserRoute>
          }
        />

        {/* Add Video (Protected) */}
        <Route
          path="/user/add-video"
          element={
            <ProtectedUserRoute>
              <AddVideo />
            </ProtectedUserRoute>
          }
        />
      </Routes>
    </div>
  );
}
