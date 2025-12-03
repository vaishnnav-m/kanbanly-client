import { useNotificationContext } from "@/providers/NotificationProvider";

export const useNotification = () => {
  const { showNotification, removeNotification } = useNotificationContext();

  return {
    notify: (
      title: string,
      message: string,
      options?: { avatar?: string; action?: { label: string; onClick: () => void } }
    ) => {
      showNotification({
        title,
        message,
        ...options,
        type: "default",
      });
    },
    dismiss: (id: string) => removeNotification(id),
  };
};
