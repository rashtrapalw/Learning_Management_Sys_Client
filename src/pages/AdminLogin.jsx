// import React, { useState } from 'react';
// import api from '../api/api';
// import { useNavigate } from 'react-router-dom';

// export default function AdminLogin(){
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const nav = useNavigate();

//   const submit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await api.post('/auth/login', { email, password });
//       localStorage.setItem('admin_token', res.data.token);
//       nav('/admin/dashboard');
//     } catch (err) {
//       alert('Login failed');
//     }
//   };

//   return (
//     <div className="row justify-content-center">
//       <div className="col-md-4">
//         <h4>Admin Login</h4>
//         <form onSubmit={submit}>
//           <div className="mb-3">
//             <input className="form-control" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email"/>
//           </div>
//           <div className="mb-3">
//             <input className="form-control" type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password"/>
//           </div>
//           <button className="btn btn-primary" type="submit">Login</button>
//         </form>
//       </div>
//     </div>
//   );
// }




// import React, { useState } from 'react';
// import api from '../api/api';
// import { useNavigate } from 'react-router-dom';
// import '../styles/login.css'; // Create this CSS file

// export default function AdminLogin() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const nav = useNavigate();

//   const submit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await api.post('/auth/login', { email, password });
//       localStorage.setItem('admin_token', res.data.token);
//       nav('/admin/dashboard');
//     } catch (err) {
//       alert('Login failed. Please check your credentials.');
//     }
//   };

//   return (
//     <div className="modern-login-container">
//       <div className="modern-login-card">
//         <h2 className="modern-login-title">Admin Login</h2>
//         <form onSubmit={submit} className="modern-form">
//           <div className="modern-input-group">
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//             <label>Email</label>
//           </div>
//           <div className="modern-input-group">
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//             <label>Password</label>
//           </div>
//           <button className="modern-login-btn" type="submit">
//             Login
//           </button>
//         </form>
//         {/* <p className="modern-forgot-password">Forgot Password?</p> */}
//       </div>
//     </div>
//   );
// }




import React, { useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("admin_token", res.data.token);
      nav("/admin/dashboard");
    } catch {
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">

        <div className="login-header">
          <h2>Admin Login</h2>
          <p>Access your dashboard securely</p>
        </div>

        <form onSubmit={submit} className="login-form">
          <div className="input-field">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Email Address</label>
          </div>

          <div className="input-field">
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label>Password</label>
          </div>

          <button type="submit" className="login-btn">
            Login
          </button>
        </form>

      </div>
    </div>
  );
}
