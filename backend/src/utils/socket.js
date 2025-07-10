//socket.js backend

const socket = require("socket.io");
const { Chat } = require("../models/chat");
const ConnectionRequest = require("../models/connectionRequest");

// This is fine, no hashing needed — just sort & join.
const getRoomId = (userId, targetUserId) => {
  return [userId, targetUserId].sort().join("$");
};

const initializeSocket = (server) => {
  const io = socket(server, {
    cors: {
      origin: [
      "http://localhost:5173",
      "https://campusmatch.vercel.app"
    ],
      
    },
  });

  io.on("connection", (socket) => {
    console.log("New socket connected:", socket.id);

    socket.on("joinChat", ({ roomId, firstName }) => {
      console.log(`${firstName} joined Room: ${roomId}`);
      socket.join(roomId);
    });

    socket.on(
      "sendMessage",
      async ({ roomId, firstName, lastName, userId, targetUserId, text }) => {
        console.log("SERVER got:", text, "RoomID:", roomId); //debug here
        try {
          console.log(`${firstName} says: ${text}`);

          let chat = await Chat.findOne({
            participants: { $all: [userId, targetUserId] },
          });

          if (!chat) {
            chat = new Chat({
              participants: [userId, targetUserId],
              messages: [],
            });
          }

          chat.messages.push({
            senderId: userId,
            text,
          });

          await chat.save();

          // Broadcast to same room
          io.to(roomId).emit("messageReceived", { firstName, lastName, text });
          console.log("SERVER emitted:", text, "RoomID:", roomId); // 🟢
        } catch (err) {
          console.log(err);
        }
      }
    );

    socket.on("disconnect", () => {
      console.log("Socket disconnected:", socket.id);
    });
  });
};

module.exports = initializeSocket;
