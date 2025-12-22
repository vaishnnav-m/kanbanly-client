"use client";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from "react";

export interface NotificationAction {
  label: string;
  onClick: () => void;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  avatar?: string;
  type?: "default" | "success" | "warning" | "error";
  timestamp: number;
  action?: NotificationAction;
  isVisible: boolean;
}

interface NotificationContextType {
  notifications: Notification[];
  showNotification: (
    notification: Omit<Notification, "id" | "isVisible" | "timestamp">
  ) => string;
  removeNotification: (id: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

export const useNotificationContext = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotificationContext must be used within a NotificationProvider"
    );
  }
  return context;
};

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const removeNotification = useCallback((id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isVisible: false } : n))
    );

    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 300);
  }, []);

  const showNotification = useCallback(
    (data: Omit<Notification, "id" | "isVisible" | "timestamp">) => {
      const id = Math.random().toString(36).substr(2, 9);
      const newNotification: Notification = {
        ...data,
        id,
        timestamp: Date.now(),
        isVisible: true,
      };

      setNotifications((prev) => [newNotification, ...prev]);

      setTimeout(() => {
        removeNotification(id);
      }, 5000);

      return id;
    },
    [removeNotification]
  );

  return (
    <NotificationContext.Provider
      value={{ notifications, showNotification, removeNotification }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
