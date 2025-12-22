"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Bell } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Notification,
  useNotificationContext,
} from "@/providers/NotificationProvider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/atoms/avatar";

interface NotificationItemProps {
  notification: Notification;
}

const NotificationItem: React.FC<NotificationItemProps> = ({
  notification,
}) => {
  const { removeNotification } = useNotificationContext();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 50, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
      className={cn(
        "w-[380px] bg-background/95 backdrop-blur-md border border-border/50",
        "rounded-xl shadow-lg overflow-hidden pointer-events-auto",
        "dark:shadow-black/20 dark:bg-zinc-900/90"
      )}
    >
      <div className="p-4 flex items-start gap-3">
        {/* Icon or Avatar */}
        <div className="flex-shrink-0 mt-0.5">
          {notification.avatar ? (
            <Avatar className="h-9 w-9 border border-border/50">
              <AvatarImage src={notification.avatar} />
              <AvatarFallback>N</AvatarFallback>
            </Avatar>
          ) : (
            <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <Bell className="h-4 w-4" />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h5 className="text-sm font-semibold text-foreground truncate">
              {notification.title}
            </h5>
            <span className="text-[10px] text-muted-foreground flex-shrink-0">
              Just now
            </span>
          </div>
          <p className="text-sm text-muted-foreground mt-0.5 leading-relaxed line-clamp-2">
            {notification.message}
          </p>

          {/* Optional Action */}
          {notification.action && (
            <div className="mt-3">
              <button
                onClick={() => {
                  notification.action?.onClick();
                  removeNotification(notification.id);
                }}
                className="text-xs font-medium text-primary hover:text-primary/80 transition-colors"
              >
                {notification.action.label}
              </button>
            </div>
          )}
        </div>

        {/* Close Button */}
        <button
          onClick={() => removeNotification(notification.id)}
          className="flex-shrink-0 text-muted-foreground/60 hover:text-foreground transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </motion.div>
  );
};

export const NotificationContainer = () => {
  const { notifications } = useNotificationContext();

  return (
    <div className="fixed top-4 right-4 z-[100] flex flex-col gap-3 pointer-events-none">
      <AnimatePresence mode="popLayout">
        {notifications
          .filter((n) => n.isVisible)
          .map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
            />
          ))}
      </AnimatePresence>
    </div>
  );
};
