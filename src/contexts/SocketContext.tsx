"use client";
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
  joinRooms: (workSpaceId: string) => void;
}

const SocketContext = createContext<ISocketContext>({
  socket: null,
  joinRooms: () => {},
});

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }: { children: ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  const joinRooms = useCallback(
    (workSpaceId: string) => {
      if (socket) {
        socket.emit("joinRooms", { workSpaceId });
      }
    },
    [socket]
  );

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

      newSocket.connect();
      setSocket(newSocket);

      return () => {
        newSocket.disconnect();
      };
    }
  }, [isAuthenticated]);

  return (
    <SocketContext.Provider value={{ socket, joinRooms }}>
      {children}
    </SocketContext.Provider>
  );
};
