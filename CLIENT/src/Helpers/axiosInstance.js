import axios from "axios";

const BASE_API = import.meta.env.VITE_BASE_URL;

const axiosInstance = axios.create({
  baseURL: BASE_API,
  withCredentials: true,
  
});

export default axiosInstance;
