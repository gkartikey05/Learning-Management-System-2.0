import axios from "axios";

const BASE_API = "http://localhost:5010/api/v1";

const axiosInstance = axios.create({
  baseURL: BASE_API,
  withCredentials: true,
});

export default axiosInstance;
