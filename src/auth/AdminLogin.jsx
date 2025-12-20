import { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     try {
//       await API.post("/api/auth/login", { email, password });
//       navigate("/admin/dashboard");
//     } catch {
//       alert("Admin login failed");
//     }
//   };

     const handleLogin = async (e) => {
        e.preventDefault();
        try {
          const res = await API.post("/auth/login", { email, password });
          localStorage.setItem("admin_token", res.data.token);
          navigate("/admin/dashboard");
        } catch {
          alert("Login failed. Please check your credentials.");
        }
      };



  return (
    <>
      <h2>Admin Login</h2>
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Admin Email" required onChange={(e)=>setEmail(e.target.value)} />
        <input type="password" placeholder="Password" required onChange={(e)=>setPassword(e.target.value)} />
        <button type="submit">Login</button>
      </form>
    </>
  );
}
