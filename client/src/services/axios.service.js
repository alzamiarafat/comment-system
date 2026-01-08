import axios from "axios";

const apiBaseURL = `${process.env.REACT_APP_API_BASE_URL}/api`;
const axiosConfig = axios.create({
  baseURL: apiBaseURL,
  withCredentials: true,
});

axiosConfig.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axiosConfig.interceptors.response.use(
  (res) => res,
  async (err) => {
    const original = err.config;
    if (err.response?.status === 401 && !original._retry) {
      original._retry = true;
      const { data } = await axios.post(
        `${apiBaseURL}/auth/refresh`,
        {},
        { withCredentials: true }
      );
      localStorage.setItem("accessToken", data.accessToken);
      original.headers.Authorization = `Bearer ${data.accessToken}`;
      return axiosConfig(original);
    }
    return Promise.reject(err);
  }
);

export default axiosConfig;
