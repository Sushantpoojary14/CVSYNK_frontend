import Axios from "axios";
const axiosBaseURL = Axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});
axiosBaseURL.interceptors.response.use(
  (response) => response,
 (error) => error.response
);
export default axiosBaseURL;
