"use client";
import React from "react";
import { Bell, Check, X } from "lucide-react";
import { Button } from "../atoms/button";
import { ScrollArea } from "../atoms/scroll-area";
import {
  useGetUserNotifications,
  useMarkAsRead,
} from "@/lib/hooks/useUser";
import {
  useRejectInvitation,
  useVerifyInvitation,
} from "@/lib/hooks/useWorkspace";
import { formatDistanceToNow } from "date-fns";
import { Loader2 } from "lucide-react";

export const NotificationList = () => {
  const { data, isLoading } = useGetUserNotifications();
  const { mutate: markAsRead } = useMarkAsRead();
  const { mutate: acceptInvitation, isPending: isAccepting } =
    useVerifyInvitation();
  const { mutate: rejectInvitation, isPending: isRejecting } =
    useRejectInvitation();

  const notifications = data?.data ?? [];

  const handleAccept = (token: string, notificationId: string) => {
    acceptInvitation(
      { token },
      {
        onSuccess: () => {
          markAsRead([notificationId]);
        },
      }
    );
  };

  const handleReject = (token: string, notificationId: string) => {
    rejectInvitation(
      { token },
      {
        onSuccess: () => {
          markAsRead([notificationId]);
        },
      }
    );
  };

  if (isLoading) {
    return (
      <div className="p-4 flex justify-center items-center h-40">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (notifications.length === 0) {
    return (
      <div className="p-8 flex flex-col items-center justify-center text-center text-muted-foreground h-60">
        <Bell className="h-8 w-8 mb-2 opacity-20" />
        <p className="text-sm">No notifications yet</p>
      </div>
    );
  }

  return (
    <ScrollArea className="h-[400px] w-[350px] sm:w-[400px] p-2">
      <div className="flex flex-col gap-2">
        {notifications.map((notification) => (
          <div
            key={notification.notificationId}
            className="flex flex-col gap-2 p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
          >
            <div className="flex justify-between items-start gap-2">
              <h4 className="text-sm font-semibold leading-none">
                {notification.title}
              </h4>
              <span className="text-[10px] text-muted-foreground whitespace-nowrap">
                {formatDistanceToNow(new Date(notification.createdAt), {
                  addSuffix: true,
                })}
              </span>
            </div>
            <p className="text-xs text-muted-foreground leading-snug">
              {notification.message}
            </p>

            {/* Invitation Actions */}
            {notification.type === "INVITATION" && notification.token && (
              <div className="flex gap-2 mt-2">
                <Button
                  size="sm"
                  className="h-7 px-3 text-xs bg-green-600 hover:bg-green-700 text-white"
                  onClick={() =>
                    handleAccept(notification.token!, notification.notificationId)
                  }
                  disabled={isAccepting || isRejecting}
                >
                  {isAccepting ? (
                    <Loader2 className="h-3 w-3 animate-spin" />
                  ) : (
                    <Check className="h-3 w-3 mr-1" />
                  )}
                  Accept
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="h-7 px-3 text-xs border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 dark:hover:bg-red-900/20"
                  onClick={() =>
                    handleReject(notification.token!, notification.notificationId)
                  }
                  disabled={isAccepting || isRejecting}
                >
                  {isRejecting ? (
                    <Loader2 className="h-3 w-3 animate-spin" />
                  ) : (
                    <X className="h-3 w-3 mr-1" />
                  )}
                  Reject
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};
