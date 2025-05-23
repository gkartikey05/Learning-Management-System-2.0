import axios from "axios";

const BASE_API = [
  import.meta.env.BASE_URL_DEV || import.meta.env.BASE_URL_PROD,
];

const axiosInstance = axios.create({
  baseURL: BASE_API,
  withCredentials: true,
});

export default axiosInstance;
