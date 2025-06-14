import { ToastAction, useToastContext } from "@/providers/ToastProvider";

interface ToastOptions {
  title: string;
  description?: string;
  duration: number;
  actions?: ToastAction[];
}

export const useToastMessage = () => {
  const { addToast, removeToast } = useToastContext();

  const showSuccess = (options: ToastOptions) => {
    return addToast({
      type: "success",
      ...options,
    });
  };

  const showError = (options: ToastOptions) => {
    return addToast({
      type: "error",
      ...options,
    });
  };

  const showWarning = (options: ToastOptions) => {
    return addToast({
      type: "warning",
      ...options,
    });
  };

  const showInfo = (options: ToastOptions) => {
    return addToast({
      type: "info",
      ...options,
    });
  };

  const dismiss = (id: string) => {
    removeToast(id);
  };

  return {
    showSuccess,
    showError,
    showWarning,
    showInfo,
    dismiss,
  };
};
