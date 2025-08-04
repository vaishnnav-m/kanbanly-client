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
    actions?: any[];
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

    if (error.response?.status === 403) {
      if (!isRefreshing) {
        isRefreshing = true;
        try {
          await api.get("/auth/refresh");
          isRefreshing = false;

          return api(originalRequest);
        } catch (error) {
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

    return Promise.reject(error);
  }
);

export default api;
