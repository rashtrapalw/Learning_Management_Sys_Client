import { useState, useContext } from "react";
import API from "../api/userApi";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function UserLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loginUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/api/user/login", { email, password });
      loginUser(res.data.token, res.data.name);
      navigate("/user/dashboard");
    } catch (err) {
      alert("Invalid credentials");
    }
  };

  return (
    <>
      <h2>User Login</h2>
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Email" required onChange={(e)=>setEmail(e.target.value)} />
        <input type="password" placeholder="Password" required onChange={(e)=>setPassword(e.target.value)} />
        <button type="submit">Login</button>
      </form>
    </>
  );
}
