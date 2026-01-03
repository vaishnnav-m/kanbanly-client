import axios from "axios";
import { apiConfig } from "../config";

const api = axios.create({
  baseURL: apiConfig.baseUrl,
  withCredentials: true,
});

interface ToastMethods {
  showWarning: (options: {
    title: string;
    description?: string;
    duration: number;
  }) => string;
}

let toastInstance: ToastMethods | null = null;
export const setToastMessageInstance = (instance: ToastMethods) => {
  toastInstance = instance;
};

let isRefreshing = false;

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (!error.response) {
      toastInstance?.showWarning({
        title: "Server is unreachable",
        description: "Please check your connection or try again later.",
        duration: 5000,
      });
      return Promise.reject(error);
    }

    if (originalRequest?.url?.includes("/refresh")) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401) {
      if (!isRefreshing) {
        isRefreshing = true;
        try {
          await api.get("/auth/refresh");
          isRefreshing = false;

          return api(originalRequest);
        } catch (error) {
          console.log(error);
          isRefreshing = false;
          localStorage.removeItem("isAuthenticated");
          toastInstance?.showWarning({
            title: "Your session has expired.",
            description: "For your security, please log in again to continue.",
            duration: 6000,
          });
          window.location.href = "/login";
        }
      }
    }

    if (error.response?.status === 500) {
      toastInstance?.showWarning({
        title: "Something went wrong",
        description:
          "We’re having trouble on our side. Please try again later.",
        duration: 5000,
      });
    }

    return Promise.reject(error);
  }
);

export default api;
