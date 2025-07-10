import io from "socket.io-client";
import { BASE_URL } from "./constants";

export const createSocketConnection = () => {
  if (location.hostname === "localhost") {
    return io(BASE_URL, {
      transports: ["websocket"],
      withCredentials: true,
    });
  } else {
    return io("https://campusmatch-backend.onrender.com", {
      transports: ["websocket"],
      withCredentials: true,
    });
  }
};
