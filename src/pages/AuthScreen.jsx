import { useState } from "react";
import UserLogin from "../auth/UserLogin";
import AdminLogin from "../auth/AdminLogin";
import Register from "../auth/Register";
import "../styles/auth.css";

export default function AuthScreen() {
  const [mode, setMode] = useState("user"); // user | admin | register

  return (
    <div className="auth-wrapper">
      <div className="auth-card">

        {/* TOP BUTTONS */}
        <div className="auth-switch">
          <button
            className={mode === "user" ? "active" : ""}
            onClick={() => setMode("user")}
          >
            User Login
          </button>

          <button
            className={mode === "admin" ? "active" : ""}
            onClick={() => setMode("admin")}
          >
            Admin Login
          </button>
        </div>

        {/* FORM AREA */}
        {mode === "user" && <UserLogin />}
        {mode === "admin" && <AdminLogin />}
        {mode === "register" && <Register />}

        {/* REGISTER LINK */}
        {mode !== "register" && (
          <p className="auth-link" onClick={() => setMode("register")}>
            New user? Register here
          </p>
        )}

        {mode === "register" && (
          <p className="auth-link" onClick={() => setMode("user")}>
            Already have an account? Login
          </p>
        )}

      </div>
    </div>
  );
}
