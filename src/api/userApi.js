// import axios from "axios";

// const API = axios.create({
//   baseURL:  "https://lms-api-nptt.onrender.com",
// });



// // Add token to requests
// API.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) config.headers.Authorization = token;
//   return config;
// });

// export default API;


import axios from "axios";

/*
  BASE API URL
  - First it will use VITE_API_URL from .env
  - If not found, it will use localhost (for development)
*/
const BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

/*
  Create axios instance
*/
const userApi = axios.create({
  baseURL: BASE,
});

/*
  Add token automatically to every request
  This token is for normal USER (not admin)
*/
userApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // user token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default userApi;
