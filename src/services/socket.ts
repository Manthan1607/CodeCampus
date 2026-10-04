import { io, Socket } from "socket.io-client";

const SOCKET_URL = "http://localhost:5000";

export const socket: Socket = io(SOCKET_URL, {
  autoConnect: false,
  reconnectionAttempts: 5,
  timeout: 5000,
});

export const connectSocket = () => {
  if (!socket.connected) {
    socket.connect();
  }
};

export const disconnectSocket = () => {
  if (socket.connected) {
    socket.disconnect();
  }
};
