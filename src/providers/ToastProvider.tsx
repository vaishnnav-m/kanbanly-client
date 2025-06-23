"use client";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useRef,
  useEffect,
  useCallback,
} from "react";

export interface ToastAction {
  label: string;
  onClick: () => void;
  variant?: "default" | "destructive";
}

export interface Toast {
  id: string;
  type: "success" | "error" | "warning" | "info";
  title: string;
  description?: string;
  duration: number;
  actions?: ToastAction[];
  isVisible: boolean;
  isPaused: boolean;
  startTime: number;
  remainingDuration: number;
}

interface ToastContextType {
  toasts: Toast[];
  addToast: (
    toast: Omit<
      Toast,
      "id" | "isVisible" | "isPaused" | "startTime" | "remainingDuration"
    >
  ) => string;
  removeToast: (id: string) => void;
  pauseToast: (id: string) => void;
  resumeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToastContext = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToastContext must be used within a ToastProvider");
  }
  return context;
};

interface ToastProviderProps {
  children: ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const toastTimers = useRef<{ [key: string]: NodeJS.Timeout | null }>({});

  // Function to clear and set a new timer for a toast
  const manageToastTimer = useCallback((toastId: string, duration: number) => {
    // Clear any existing timer for this toast
    if (toastTimers.current[toastId]) {
      clearTimeout(toastTimers.current[toastId] as NodeJS.Timeout);
    }

    const timer = setTimeout(() => {
      setToasts((prevToasts) => {
        const currentToast = prevToasts.find((t) => t.id === toastId);
        if (currentToast && !currentToast.isPaused) {
          // Trigger dismissal if not paused
          return prevToasts.map((t) =>
            t.id === toastId ? { ...t, isVisible: false } : t
          );
        }
        return prevToasts;
      });

      // After dismissal animation, actually remove the toast
      setTimeout(() => {
        setToasts((prevToasts) => prevToasts.filter((t) => t.id !== toastId));
        delete toastTimers.current[toastId]; // Clean up the timer reference
      }, 300); // Duration for exit animation
    }, duration);

    toastTimers.current[toastId] = timer;
  }, []);

  const addToast = (
    toastData: Omit<
      Toast,
      "id" | "isVisible" | "isPaused" | "startTime" | "remainingDuration"
    >
  ): string => {
    const id = Math.random().toString(36).substr(2, 9);
    const initialDuration = toastData.duration || 5000;

    const newToast: Toast = {
      ...toastData,
      id,
      isVisible: true,
      isPaused: false,
      duration: initialDuration,
      startTime: Date.now(),
      remainingDuration: initialDuration,
    };

    setToasts((prev) => {
      const updatedToasts = [...prev, newToast];
      // Set the initial dismissal timer
      manageToastTimer(newToast.id, newToast.duration);
      return updatedToasts;
    });

    return id;
  };

  const removeToast = (id: string) => {
    // Clear the timer immediately if manually dismissed
    if (toastTimers.current[id]) {
      clearTimeout(toastTimers.current[id] as NodeJS.Timeout);
      delete toastTimers.current[id];
    }

    setToasts((prev) =>
      prev.map((toast) =>
        toast.id === id ? { ...toast, isVisible: false } : toast
      )
    );

    // Give time for exit animation before removing from DOM
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 300);
  };

  const pauseToast = (id: string) => {
    setToasts((prev) =>
      prev.map((toast) => {
        if (toast.id === id && !toast.isPaused) {
          // Clear the timer
          if (toastTimers.current[id]) {
            clearTimeout(toastTimers.current[id] as NodeJS.Timeout);
            toastTimers.current[id] = null; // Mark as cleared
          }

          // Calculate remaining time
          const elapsedTime = Date.now() - toast.startTime;
          const newRemainingDuration = Math.max(
            0,
            toast.duration - elapsedTime
          );
          return {
            ...toast,
            isPaused: true,
            remainingDuration: newRemainingDuration,
          };
        }
        return toast;
      })
    );
  };

  const resumeToast = (id: string) => {
    setToasts((prev) =>
      prev.map((toast) => {
        if (toast.id === id && toast.isPaused) {
          // Set a new timer with the remaining duration
          manageToastTimer(toast.id, toast.remainingDuration);

          return {
            ...toast,
            isPaused: false,
            startTime: Date.now(),
          };
        }
        return toast;
      })
    );
  };

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      for (const id in toastTimers.current) {
        if (toastTimers.current[id]) {
          clearTimeout(toastTimers.current[id] as NodeJS.Timeout);
        }
      }
    };
  }, []);

  return (
    <ToastContext.Provider
      value={{
        toasts,
        addToast,
        removeToast,
        pauseToast,
        resumeToast,
      }}
    >
      {children}
    </ToastContext.Provider>
  );
};
