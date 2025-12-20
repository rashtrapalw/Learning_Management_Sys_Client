import axios from "axios";

const ADMIN_API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// attach admin token
ADMIN_API.interceptors.request.use((config) => {
  const token = localStorage.getItem("adminToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default ADMIN_API;
