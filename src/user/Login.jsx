
// import { useState, useContext } from "react";
// import API from "../api/userApi";
// import { AuthContext } from "../context/AuthContext";

// export default function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const { loginUser } = useContext(AuthContext);

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await API.post("/api/user/login", {
//         email,
//         password,
//       });

//       loginUser(res.data.token, res.data.name);
//       alert("Login Successful");
//     } catch (error) {
//       alert(error.response?.data?.message || "Login failed");
//       console.error(error);
//     }
//   };

//   return (
//     <div className="auth-box">
//       <h2>Login</h2>

//       <form onSubmit={handleLogin}>
//         <input
//           type="email"
//           placeholder="Enter Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />

//         <input
//           type="password"
//           placeholder="Enter Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />

//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// }




import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/userApi";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loginUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("user/login", { email, password });

      loginUser(res.data.token, res.data.name);
      alert("Login Successful");
      navigate("/user/dashboard");
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="auth-box">
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

