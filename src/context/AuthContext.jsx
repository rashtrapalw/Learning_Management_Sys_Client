import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(localStorage.getItem("userName") || null);

  const loginUser = (token, name) => {
    localStorage.setItem("token", token);
    localStorage.setItem("userName", name);
    setUser(name);
  };

  const logoutUser = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};
