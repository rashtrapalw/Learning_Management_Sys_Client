// import { useState } from "react";
// import API from "../api/userApi";

// export default function Register() {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleRegister = async (e) => {
//     e.preventDefault();

//     await API.post("/api/user/register", { name, email, password });
//     alert("Registered Successfully");
//   };

//   return (
//     <div className="auth-box">
//       <h2>Register</h2>

//       <form onSubmit={handleRegister}>
//         <input
//           type="text"
//           placeholder="Your Name"
//           onChange={(e) => setName(e.target.value)}
//         />

//         <input
//           type="email"
//           placeholder="Enter Email"
//           onChange={(e) => setEmail(e.target.value)}
//         />

//         <input
//           type="password"
//           placeholder="Enter Password"
//           onChange={(e) => setPassword(e.target.value)}
//         />

//         <button type="submit">Register</button>
//       </form>
//     </div>
//   );
// }




import { useState } from "react";
import API from "../api/userApi";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      // calling backend register API
      await API.post("user/register", {
        name,
        email,
        password,
      });

      alert("Registered Successfully");

      // optional: clear form after success
      setName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      // handle backend or network errors
      alert(error.response?.data?.message || "Registration failed");
      console.error(error);
    }
  };

  return (
    <div className="auth-box">
      <h2>Register</h2>

      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Your Name"
          value={name}                 // controlled input
          onChange={(e) => setName(e.target.value)}
          required                     // basic validation
        />

        <input
          type="email"
          placeholder="Enter Email"
          value={email}                // controlled input
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}             // controlled input
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Register</button>
      </form>
    </div>
  );
}
