import axios from "axios";

const BASE_API = import.meta.env.VITE_BASE_URL;

const axiosInstance = axios.create({
  baseURL: BASE_API,
  withCredentials: true,
});

// Add a request interceptor to include JWT token if present
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
