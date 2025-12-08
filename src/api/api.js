// import axios from 'axios';
// const BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// const instance = axios.create({ baseURL: BASE });

// // attach token when present for admin routes
// instance.interceptors.request.use(cfg => {
//   const token = localStorage.getItem('admin_token');
//   if (token) cfg.headers.Authorization = `Bearer ${token}`;
//   return cfg;
// });

// export default instance;


import axios from "axios";

const BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";


const instance = axios.create({ baseURL: BASE });

// add token only for admin
instance.interceptors.request.use((cfg) => {
  const token = localStorage.getItem("admin_token");
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});

export default instance;
