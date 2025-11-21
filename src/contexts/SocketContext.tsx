"use client";
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
import { RootState } from "@/store";
import { apiConfig } from "@/lib/config";
import { MessageResponse } from "@/lib/api/message/message.types";
import { getStorageItem, setStorageItem } from "@/lib/utils";

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
  const sender = useSelector((state: RootState) => state.auth.userId);

  const joinRooms = useCallback(
    (workSpaceId: string, chatId: string) => {
      const rooms = { workSpaceId, chatId };
      setStorageItem("joinedRooms", JSON.stringify(rooms));
      if (socket) {
        socket.emit("joinRooms", rooms);
      }
    },
    [socket]
  );

  const sendMessage = useCallback(
    (chatId: string, text: string) => {
      if (socket) {
        setMessages((prev) => [
          ...prev,
          {
            text: text,
            createdAt: new Date(),
            sender,
          },
        ]);
        console.log("sending message...", text);
        socket.emit("sendMessage", { chatId, text });
      } else {
        console.warn("Socket is not connected, Can't send message");
      }
    },
    [socket, sender]
  );

  const recieveMessage = useCallback(
    (message: { chatId: string; senderId: string; text: string }) => {
      console.log("message recieved", message);
      setMessages((prev) => [
        ...prev,
        {
          text: message.text,
          createdAt: new Date(),
          sender: message.senderId,
        },
      ]);
    },
    []
  );

  useEffect(() => {
    if (isAuthenticated) {
      const newSocket = io(apiConfig.socketUrl, {
        withCredentials: true,
        autoConnect: false,
      });

      newSocket.on("connect", () => {
        console.log("Socket connected");

        const savedRooms = getStorageItem("joinedRooms");
        if (savedRooms) {
          const rooms = JSON.parse(savedRooms);
          newSocket.emit("joinRooms", rooms);
        }
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
