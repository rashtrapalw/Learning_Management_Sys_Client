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

const BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

const userApi = axios.create({
  baseURL: BASE,
});

userApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // user token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default userApi;
