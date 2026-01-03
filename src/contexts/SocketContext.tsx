"use client";
import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import { useSelector } from "react-redux";
import { io, Socket } from "socket.io-client";
import { RootState } from "@/store";
import { apiConfig } from "@/lib/config";
import { MessageResponse } from "@/lib/api/message/message.types";
import { NotificationResponse } from "@/lib/api/user/user.types";
import { useNotification } from "@/lib/hooks/useNotification";
import { TaskListing } from "@/lib/api/task/task.types";
import { useQueryClient } from "@tanstack/react-query";

interface ISocketContext {
  socket: Socket | null;
  joinChatRoom: (chatId: string) => void;
  sendMessage: (chatId: string, text: string) => void;
  messages: MessageResponse[];
  notifications: NotificationResponse[];
  tasks: TaskListing[];
  joinWorkspaceRoom: (workSpaceId: string) => void;
  joinProjectRoom: (projectId: string) => void;
  isConnected: boolean;
}

const SocketContext = createContext<ISocketContext>({
  socket: null,
  joinChatRoom: () => {},
  sendMessage: () => {},
  messages: [],
  notifications: [],
  tasks: [],
  joinWorkspaceRoom: () => {},
  joinProjectRoom: () => {},
  isConnected: false,
});

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }: { children: ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState<MessageResponse[]>([]);
  const [notifications, setNotifications] = useState<NotificationResponse[]>(
    []
  );
  const [tasks, setTasks] = useState<TaskListing[]>([]);
  const { notify } = useNotification();
  const notifyRef = useRef(notify);
  const socketRef = useRef<Socket | null>(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    notifyRef.current = notify;
  }, [notify]);

  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const sender = useSelector((state: RootState) => state.auth.userId);

  // room joinings
  // function to join workspace room
  const joinWorkspaceRoom = useCallback((workSpaceId: string) => {
    if (socketRef.current && socketRef.current.connected) {
      socketRef.current.emit("joinWorkspaceRoom", { workSpaceId });
    }
  }, []);

  // function to join project room
  const joinProjectRoom = useCallback((projectId: string) => {
    if (socketRef.current && socketRef.current.connected) {
      console.log("joining project room,..")
      socketRef.current.emit("joinProjectRoom", { projectId });
    }
  }, []);

  // function to join chat room
  const joinChatRoom = useCallback((chatId: string) => {
    setMessages([]);
    const rooms = { chatId };
    if (socketRef.current && socketRef.current.connected) {
      socketRef.current.emit("joinChatRoom", rooms);
    }
  }, []);

  // population and sending
  //  function send message
  const sendMessage = useCallback(
    (chatId: string, text: string) => {
      if (socketRef.current) {
        setMessages((prev) => [
          ...prev,
          {
            text: text,
            createdAt: new Date(),
            sender,
            chatId,
          },
        ]);
        console.log("sending message...", text);
        socketRef.current.emit("sendMessage", { chatId, text });
      } else {
        console.warn("Socket is not connected, Can't send message");
      }
    },
    [sender]
  );

  // function to populate recived message
  const recieveMessage = useCallback(
    (message: { chatId: string; senderId: string; text: string }) => {
      console.log("message recieved", message);
      setMessages((prev) => [
        ...prev,
        {
          text: message.text,
          createdAt: new Date(),
          sender: message.senderId,
          chatId: message.chatId,
        },
      ]);
    },
    []
  );

  // function to populate notification
  const handleNotification = useCallback(
    (notification: NotificationResponse) => {
      setNotifications((prev) => [...prev, notification]);
      notifyRef.current(notification.title, notification.message);
      queryClient.invalidateQueries({ queryKey: ["getUserNotifications"] });
    },
    [queryClient]
  );

  // function to populate new task
  const handleNewTask = useCallback((task: TaskListing) => {
    setTasks((prev) => [...prev, task]);
    console.log("new task added", task);
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      const newSocket = io(apiConfig.socketUrl, {
        withCredentials: true,
        autoConnect: false,
      });

      newSocket.on("connect", () => {
        console.log("Socket connected");
        setIsConnected(true);
      });

      newSocket.on("disconnect", () => {
        console.log("Socket disconnected");
        setIsConnected(false);
      });

      newSocket.on("connect_error", (err) => {
        console.log("Socket connection error", err.message);
        setIsConnected(false);
      });

      // socket events
      newSocket.on("messageReceived", recieveMessage);
      newSocket.on("notification", handleNotification);
      newSocket.on("taskchange", handleNewTask);

      newSocket.connect();
      socketRef.current = newSocket;
      setSocket(newSocket);

      return () => {
        newSocket.off("messageReceived", recieveMessage);
        newSocket.off("notification", handleNotification);
        newSocket.disconnect();
        socketRef.current = null;
      };
    }
  }, [isAuthenticated, recieveMessage, handleNotification, handleNewTask]);

  return (
    <SocketContext.Provider
      value={{
        socket,
        joinChatRoom,
        sendMessage,
        messages,
        notifications,
        joinWorkspaceRoom,
        joinProjectRoom,
        isConnected,
        tasks,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};
