import Axios from "axios";

const tokenAxios = Axios.create({
  baseURL:import.meta.env.VITE_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

tokenAxios.interceptors.request.use(
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

tokenAxios.interceptors.response.use(
  (response) => response ,
 
  async (error) => {
    const originalRequest = error.config;
    console.log("server error " + error );
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.reload();
    }
    // originalRequest._retry = true;
    return error.response;
  }
);

export default tokenAxios;