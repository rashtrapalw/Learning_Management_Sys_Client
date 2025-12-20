import { useState } from "react";
import API from "../api/userApi";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    await API.post("/api/user/register", { name, email, password });
    alert("Registered successfully");
  };

  return (
    <>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input placeholder="Name" required onChange={(e)=>setName(e.target.value)} />
        <input type="email" placeholder="Email" required onChange={(e)=>setEmail(e.target.value)} />
        <input type="password" placeholder="Password" required onChange={(e)=>setPassword(e.target.value)} />
        <button type="submit">Register</button>
      </form>
    </>
  );
}
