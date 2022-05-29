import axios from "axios";
import urlConstants from "../constants/urlConstants";

let axiosInstance = axios.create({
  baseURL: urlConstants.API_BASE_URL,
  // withCredentials: true,
});

export default axiosInstance;
