"use client";

import { Bell } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/atoms/sheet";
import { SidebarMenuButton, SidebarMenuItem } from "@/components/atoms/sidebar";
import { Badge } from "@/components/atoms/badge";
import { ScrollArea } from "@/components/atoms/scroll-area";
import { useSocket } from "@/contexts/SocketContext";

export function NotificationSheet() {
  const { notifications } = useSocket();

  return (
    <SidebarMenuItem>
      <Sheet>
        <SheetTrigger asChild>
          <SidebarMenuButton tooltip="Notifications">
            <Bell />
            <span>Notifications</span>
            {notifications.length > 0 && (
              <Badge
                variant="destructive"
                className="ml-auto h-5 min-w-5 px-1 text-[10px] flex items-center justify-center"
              >
                {notifications.length}
              </Badge>
            )}
          </SidebarMenuButton>
        </SheetTrigger>
        <SheetContent side="right" className="w-[400px] sm:w-[540px]">
          <SheetHeader>
            <SheetTitle>Notifications</SheetTitle>
            <SheetDescription>
              You have {notifications.length} unread notifications.
            </SheetDescription>
          </SheetHeader>
          <ScrollArea className="h-[calc(100vh-100px)] mt-4 pr-4">
            {notifications.length === 0 ? (
              <div className="text-center text-muted-foreground py-8">
                No notifications yet
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                {notifications.map((notification, index) => (
                  <div
                    key={index}
                    className="flex flex-col gap-1 p-4 rounded-lg border bg-card text-card-foreground shadow-sm"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold capitalize">
                        {notification.type}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {new Date(notification.createdAt).toLocaleString()}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {notification.message}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </SidebarMenuItem>
  );
}
