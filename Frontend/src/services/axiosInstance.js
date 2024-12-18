import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
});

// Thêm Interceptor cho request
axiosInstance.interceptors.request.use(
    (config) => {
      const user = JSON.parse(localStorage.getItem("user"));
  
      // Đảm bảo Content-Type luôn là application/json
      config.headers["Content-Type"] = "application/json";
  
      if (user?.token) {
        config.headers.Authorization = `Bearer ${user.token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
  

// Xử lý Interceptor cho response
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("user");
      // window.location.href = "/login"; // Redirect đến trang đăng nhập
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
