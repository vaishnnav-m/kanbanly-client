"use client";
import { MessageResponse } from "@/lib/api/chat/chat.types";
import { apiConfig } from "@/lib/config";
import { RootState } from "@/store";
import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useSelector } from "react-redux";
import { io, Socket } from "socket.io-client";

interface ISocketContext {
  socket: Socket | null;
  joinRooms: (workSpaceId: string, chatId: string) => void;
  sendMessage: (chatId: string, text: string) => void;
  messages: MessageResponse[];
}

const SocketContext = createContext<ISocketContext>({
  socket: null,
  joinRooms: () => {},
  sendMessage: () => {},
  messages: [],
});

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }: { children: ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<MessageResponse[]>([]);

  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  const joinRooms = useCallback(
    (workSpaceId: string, chatId: string) => {
      if (socket) {
        socket.emit("joinRooms", { workSpaceId, chatId });
      }
    },
    [socket]
  );

  const sendMessage = useCallback(
    (chatId: string, text: string) => {
      if (socket) {
        socket.emit("sendMessage", { chatId, text });
      } else {
        console.warn("Socket is not connected, Can't send message");
      }
    },
    [socket]
  );

  const recieveMessage = useCallback((message: { text: string }) => {
    console.log("message recieved", message);
    setMessages((prev) => [
      ...prev,
      {
        content: message.text,
        timestamp: "10:30 AM",
        isSent: false,
        status: "read",
        type: "text",
        sender: "",
      },
    ]);
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      const newSocket = io(apiConfig.socketUrl, {
        withCredentials: true,
        autoConnect: false,
      });

      newSocket.on("connect", () => {
        console.log("Socket connected");
      });

      newSocket.on("disconnect", () => {
        console.log("Socket disconnected");
      });

      newSocket.on("connect_error", (err) => {
        console.log("Socket connection error", err.message);
      });

      newSocket.on("messageReceived", recieveMessage);

      newSocket.connect();
      setSocket(newSocket);

      return () => {
        newSocket.disconnect();
      };
    }
  }, [isAuthenticated, recieveMessage]);

  return (
    <SocketContext.Provider
      value={{ socket, joinRooms, sendMessage, messages }}
    >
      {children}
    </SocketContext.Provider>
  );
};
