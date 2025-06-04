import axios from "axios";
// import { getIEmailVerified } from "../utils/auth";

const api = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  withCredentials: true,
});

// api.interceptors.request.use((config) => {
//   const token = getIEmailVerified();
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 403) {
      //  code the logic to send req to the refersh end point
    }
    return Promise.reject(error);
  }
);

export default api;
