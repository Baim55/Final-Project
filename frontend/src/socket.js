// src/socket.js
import { io } from "socket.io-client";

export const socket = io("https://final-project-1-9d1i.onrender.com/", {
  withCredentials: true,
  autoConnect: true,
});
