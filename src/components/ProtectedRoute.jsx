// import { useContext } from "react";
// import { Navigate } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";

// export default function ProtectedRoute({ children }) {
//   const { user } = useContext(AuthContext);

//   if (!user) return <Navigate to="/login" replace />;
//   return children;
// }


import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedUserRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/user/login" />;
  }

  return children;
}
