"use client";
import { Button } from "@/components/atoms/button";
import { Bell } from "lucide-react";

const notifications = [
  {
    id: 1,
    type: "bug",
    message: "You fixed a bug.",
    time: "Just now",
    read: false,
  },
  {
    id: 2,
    type: "user",
    message: "New user added.",
    time: "5 minutes ago",
    read: false,
  },
  {
    id: 3,
    type: "bug",
    message: "You fixed a bug.",
    time: "12 hours ago",
    read: true,
  },
  {
    id: 4,
    type: "meeting",
    message: "Meeting is scheduled for...",
    time: "Today, 11:59 AM",
    read: true,
  },
];

const activities = [
  {
    id: 1,
    user: "Changed the style.",
    time: "Just now",
    avatar: "CS",
  },
  {
    id: 2,
    user: "Released a new version.",
    time: "5 minutes ago",
    avatar: "RV",
  },
  {
    id: 3,
    user: "Submitted a bug.",
    time: "12 hours ago",
    avatar: "SB",
  },
  {
    id: 4,
    user: "Modified A data in Page X.",
    time: "Today, 11:59 AM",
    avatar: "MD",
  },
  {
    id: 5,
    user: "Deleted a page in Project X.",
    time: "Feb 2, 2025",
    avatar: "DP",
  },
];

const contacts = [
  { name: "Natali Craig", avatar: "NC", online: true },
  { name: "Drew Cano", avatar: "DC", online: false },
  { name: "Andi Lane", avatar: "AL", online: true },
  { name: "Koray Okumus", avatar: "KO", online: false },
  { name: "Kate Morrison", avatar: "KM", online: true },
  { name: "Melody Macy", avatar: "MM", online: false },
];

export function NotificationsPanel() {
  return (
    <div className="fixed right-0 top-[75px] w-72 max-h-screen  overflow-y-scroll animate-slide-up">
      {/* Notifications */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">Notifications</h3>
          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
            <Bell className="h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-3">
          {notifications.map((notification, index) => (
            <div
              key={notification.id}
              className={`p-3 rounded-lg transition-all duration-200 hover:bg-muted/50 animate-fade-in ${
                !notification.read
                  ? "bg-primary/5 border border-primary/20"
                  : ""
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  {!notification.read && (
                    <div className="w-2 h-2 bg-primary rounded-full" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-foreground">
                    {notification.message}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {notification.time}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Activities */}
      <div className="p-6 border-b border-border">
        <h3 className="font-semibold mb-4">Activities</h3>

        <div className="space-y-3">
          {activities.map((activity, index) => (
            <div
              key={activity.id}
              className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors duration-200 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-xs font-medium text-accent">
                {activity.avatar}
              </div>
              <div className="flex-1">
                <p className="text-sm text-foreground">{activity.user}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {activity.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contacts */}
      <div className="p-6">
        <h3 className="font-semibold mb-4">Contacts</h3>

        <div className="space-y-3">
          {contacts.map((contact, index) => (
            <div
              key={contact.name}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors duration-200 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-medium text-primary">
                  {contact.avatar}
                </div>
                {contact.online && (
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-background rounded-full animate-pulse" />
                )}
              </div>
              <span className="text-sm text-foreground">{contact.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
