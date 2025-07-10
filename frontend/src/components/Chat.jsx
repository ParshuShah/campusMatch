import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const getRoomId = (a, b) => [a, b].sort().join("$");

const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [targetUserName, setTargetUserName] = useState("Loading...");
  const user = useSelector((store) => store.user);
  const userId = user?._id;

  const socketRef = useRef(null);
  const bottomRef = useRef(null);
  const roomId = getRoomId(userId, targetUserId);

  const fetchChatMessages = async () => {
    try {
      const chat = await axios.get(BASE_URL + "/chat/" + targetUserId, {
        withCredentials: true,
      });

      const chatMessages = chat?.data?.messages.map((msg) => {
        const { senderId, text } = msg;
        return {
          firstName: senderId?.firstName,
          lastName: senderId?.lastName,
          text,
        };
      });

      setMessages(chatMessages);
    } catch (err) {
      console.error("Failed to load messages:", err);
    }
  };

  const fetchTargetUserName = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/" + targetUserId, {
        withCredentials: true,
      });

      const user = res.data?.user;
      setTargetUserName(`${user.firstName} ${user.lastName}`);
    } catch (err) {
      setTargetUserName("Unknown User");
    }
  };

  useEffect(() => {
    fetchChatMessages();
    fetchTargetUserName();
  }, []);

  useEffect(() => {
    if (!userId) return;

    socketRef.current = createSocketConnection();

    socketRef.current.emit("joinChat", {
      roomId,
      firstName: user.firstName,
    });

    socketRef.current.on("messageReceived", ({ firstName, lastName, text }) => {
      setMessages((prev) => [...prev, { firstName, lastName, text }]);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [userId, targetUserId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!socketRef.current || newMessage.trim() === "") return;

    socketRef.current.emit("sendMessage", {
      roomId,
      firstName: user.firstName,
      lastName: user.lastName,
      userId,
      targetUserId,
      text: newMessage,
    });

    setNewMessage("");
  };

  return (
    <div className="w-full max-w-3xl mx-auto mt-6 h-[85vh] flex flex-col bg-gray-900 rounded-xl shadow-lg border border-gray-700 overflow-hidden">
      {/* Header */}
      <header className="p-4 bg-gray-800 border-b border-gray-700 text-white text-lg font-semibold">
        Chat with {targetUserName}
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, index) => {
          const isMe = user.firstName === msg.firstName;
          return (
             <div
      key={index}
      className={`flex flex-col ${
        isMe ? "ml-auto items-end" : "mr-auto items-start"
      } max-w-[75%] gap-1`}
    >
      <span className="text-xs text-gray-400">
        {msg.firstName} {msg.lastName}
      </span>
      <div
        className={`px-4 py-2 rounded-xl text-sm shadow ${
          isMe
            ? "bg-purple-600 text-white"
            : "bg-gray-200 text-gray-900"
        }`}
      >
        {msg.text}
      </div>
      <span className="text-xs text-gray-500">Sent</span>
    </div>
          );
        })}
        <div ref={bottomRef}></div>
      </div>

      {/* Footer */}
      <footer className="p-4 bg-gray-800 border-t border-gray-700 flex items-center gap-3">
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") sendMessage();
          }}
          placeholder="Type a message..."
          className="flex-1 px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <button
          onClick={sendMessage}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition"
        >
          Send
        </button>
      </footer>
    </div>
  );
};

export default Chat;
