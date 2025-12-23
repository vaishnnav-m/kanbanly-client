"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Bell, Settings, Check, X, Loader2 } from "lucide-react";
import { SidebarTrigger, useSidebar } from "@/components/atoms/sidebar";
import { useLogout } from "@/lib/hooks/useAuth";
import NavUser from "@/components/molecules/NavUser";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/atoms/sheet";
import { Badge } from "@/components/atoms/badge";
import { ScrollArea } from "@/components/atoms/scroll-area";
import { useSocket } from "@/contexts/SocketContext";
import { Button } from "@/components/atoms/button";
import { useGetUserNotifications, useMarkAsRead } from "@/lib/hooks/useUser";
import { useEffect, useMemo, useState } from "react";
import { NotificationResponse } from "@/lib/api/user/user.types";
import { formatDistanceToNow } from "date-fns";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/atoms/alert-dialog";
import {
  useRejectInvitation,
  useVerifyInvitation,
} from "@/lib/hooks/useWorkspace";
import { ThemeToggleButton } from "@/components/molecules/ThemeToggleButton";

function Header() {
  const [notifications, setNotifications] = useState<NotificationResponse[]>(
    []
  );
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [selectedNotificationId, setSelectedNotificationId] = useState("");

  const params = useParams();
  const { state } = useSidebar();

  const { mutate: logout } = useLogout();

  const { mutate: markAsRead } = useMarkAsRead();
  const { mutate: acceptInvitation, isPending: isAccepting } =
    useVerifyInvitation();
  const { mutate: rejectInvitation, isPending: isRejecting } =
    useRejectInvitation();

  const { data: notificationsData } = useGetUserNotifications();
  const notificationHistory = useMemo(
    () => (notificationsData?.data ? notificationsData.data : []),
    [notificationsData?.data]
  );

  const { notifications: socketNotifications } = useSocket();

  const handleMarkAsRead = (notificationId?: string) => {
    if (notificationId) {
      markAsRead([notificationId]);
    } else {
      const notificationIds = notifications.map((notification) => {
        return notification.notificationId;
      });
      if (notificationIds.length) {
        markAsRead(notificationIds);
      }
    }
  };

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

  useEffect(() => {
    const combinedNotifications = [...notificationHistory];

    socketNotifications.forEach((scktNotification) => {
      const isDuplicate = combinedNotifications.some(
        (notification) =>
          notification.notificationId === scktNotification.notificationId
      );

      if (!isDuplicate) {
        combinedNotifications.push(scktNotification);
      }
    });

    setNotifications(combinedNotifications);
  }, [notificationHistory, socketNotifications]);

  function handleLogout() {
    logout();
  }

  return (
    <header
      className={`h-[75px] bg-sidebar fixed right-0 z-50 top-0 py-5 px-10 flex justify-between transition-all duration-300 ease-in-out ${
        state === "collapsed" ? "left-12" : "left-64"
      }`}
    >
      <div className="flex gap-16">
        <SidebarTrigger className="hover:bg-gray-800" />
      </div>
      <div>
        {/* <SearchBar placeholder="Search" /> */}
        {/* <Command className="flex justify-center rounded-lg border shadow-md md:min-w-[450px]">
          <CommandInput placeholder="Search something..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
          </CommandList>
        </Command> */}
      </div>
      <div className="flex gap-5 items-center">
        <ThemeToggleButton />
        <Sheet>
          <SheetTrigger className="relative group">
            <Bell className="w-5 h-5 bell-icon  text-foreground hover:text-foreground transition-colors" />
            {notifications.length > 0 && (
              <Badge
                variant="destructive"
                className="absolute -top-2 -right-2 h-4 w-4 p-0 flex items-center justify-center text-[10px]"
              >
                {notifications.length}
              </Badge>
            )}
          </SheetTrigger>
          <SheetContent side="right" className="w-[400px] sm:w-[540px]">
            <SheetHeader>
              <div className="flex items-center justify-between">
                <SheetTitle>Notifications</SheetTitle>
                {notifications.length > 0 && (
                  <Button
                    onClick={() => setIsConfirmationOpen(true)}
                    variant="ghost"
                    size="sm"
                    className="text-xs h-8"
                  >
                    Mark all as read
                  </Button>
                )}
              </div>
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
                      className="relative flex flex-col gap-1 p-4 rounded-lg border bg-card text-card-foreground shadow-sm group"
                    >
                      <div className="flex items-center justify-between pr-8">
                        <span className="text-sm font-semibold capitalize">
                          {notification.title}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {notification.message}
                      </p>
                      {notification.type === "INVITATION" &&
                        notification.token && (
                          <div className="flex gap-2 mt-2">
                            <Button
                              size="sm"
                              className="h-7 px-3 text-xs bg-green-600 hover:bg-green-700 text-white"
                              onClick={() =>
                                handleAccept(
                                  notification.token!,
                                  notification.notificationId
                                )
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
                                handleReject(
                                  notification.token!,
                                  notification.notificationId
                                )
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
                      <Button
                        onClick={() => {
                          setSelectedNotificationId(
                            notification.notificationId
                          );
                          setIsConfirmationOpen(true);
                        }}
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                        title="Mark as read"
                      >
                        <Check className="h-3 w-3" />
                      </Button>
                      <div className="text-end">
                        <span className="text-xs text-muted-foreground">
                          {formatDistanceToNow(
                            new Date(notification.createdAt),
                            {
                              addSuffix: true,
                            }
                          )}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
            <AlertDialog
              open={isConfirmationOpen}
              onOpenChange={setIsConfirmationOpen}
            >
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Are you sure to make all notifications read?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel
                    onClick={() => setSelectedNotificationId("")}
                  >
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => {
                      handleMarkAsRead(selectedNotificationId);
                      setSelectedNotificationId("");
                    }}
                  >
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </SheetContent>
        </Sheet>
        <Link className="group" href={`/workspaces/${params.slug}/manage`}>
          <Settings className="w-5 h-5 transition-transform duration-500 ease-in group-hover:rotate-180" />
        </Link>
        <NavUser handleLogout={handleLogout} />
      </div>
    </header>
  );
}

export default Header;
