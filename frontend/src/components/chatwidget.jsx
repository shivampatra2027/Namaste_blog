import { useState, useRef, useEffect } from "react";
import { Send, Mic, StopCircle, X, Maximize2, Minimize2 } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import { FaUserAstronaut, FaRobot } from "react-icons/fa";
import API from "../config/api.js";

const ChatWidget = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const chatEndRef = useRef(null);

  
  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => scrollToBottom(), [history]);

  const handleOpen = () => {
    setOpen(true);
    setHistory([
      {
        sender: "ai",
        text: "Hello! I’m your AI assistant. How can I help you today?",
      },
    ]);
  };

  const handleClose = () => {
    setOpen(false);
    setHistory([]);
    setInput("");
  };

  const sendMessage = async () => {
    if (!input.trim()) return;
    setHistory((prev) => [...prev, { sender: "user", text: input }]);
    const userMessage = input;
    setInput("");

    try {
      const res = await fetch(API.chatUrl(API.endpoints.chat.ask), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: userMessage }),
      });
      const data = await res.json();
      setHistory((prev) => [...prev, { sender: "ai", text: data.answer }]);
    } catch (err) {
      console.error(err);
      setHistory((prev) => [
        ...prev,
        { sender: "ai", text: "Error: AI unavailable." },
      ]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <>
      {/* Pulse animation */}
      <style>
        {`
          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
          }
        `}
      </style>

      {/* Floating Chat Icon */}
      {!open && (
        <div
          style={{
            position: "fixed",
            bottom: 20,
            right: 20,
            width: 70,
            height: 70,
            borderRadius: "50%",
            backgroundColor: "",
            color: "white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: 32,
            cursor: "pointer",
            boxShadow: "0 8px 20px rgba(0,0,0,0.4)",
            zIndex: 1000,
            animation: "pulse 1.5s infinite",
          }}
          onClick={handleOpen}>
          <img
            src="/image.png"
            alt="Chatbot"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>
      )}

      {/* Chat Window */}
      {open && (
        <div
          style={{
            position: "fixed",
            bottom: 20,
            right: 20,
            width: 360,
            height: 500,
            borderRadius: 15,
            boxShadow: "0 4px 30px rgba(0,0,0,0.2)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",

            backgroundColor: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            border: "1px solid rgba(255, 255, 255, 0.18)",
          }}>
          {/* Header */}
          <div
            style={{
              backgroundColor: "rgba(0, 123, 255, 0.65)",
              color: "white",
              padding: "10px 15px",
              fontWeight: "bold",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}>
            AI Assistant
            <span
              style={{ cursor: "pointer", fontWeight: "bold" }}
              onClick={handleClose}>
              ✖
            </span>
          </div>

          {/* Chat Content */}
          <div
            style={{
              flexGrow: 1,
              padding: 15,
              overflowY: "auto",
              backgroundColor: "transparent",
              display: "flex",
              flexDirection: "column",
            }}>
            {history.map((chat, index) => (
              <div
                key={index}
                style={{
                  alignSelf: chat.sender === "user" ? "flex-end" : "flex-start",
                  backgroundColor:
                    chat.sender === "user" ? "#007bff" : "#e5e5ea",
                  color: chat.sender === "user" ? "white" : "#333",
                  padding: "10px 14px",
                  borderRadius:
                    chat.sender === "user"
                      ? "20px 20px 0px 20px"
                      : "20px 20px 20px 0px",
                  maxWidth: "70%",
                  margin: "5px 0",
                  boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                }}>
                {chat.text}
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* Input */}
          <div
            style={{
              display: "flex",
              padding: 10,
              borderTop: "1px solid rgba(255, 255, 255, 0.18)",
            }}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Type your message..."
              style={{
                flexGrow: 1,
                color: "black",
                padding: "10px 12px",
                borderRadius: 20,
                border: "1px solid rgba(255, 255, 255, 0.3)",
                backgroundColor: "rgba(255, 255, 255, 0.25)",
                marginRight: 10,
                fontSize: 14,
              }}
            />
            <button
              onClick={sendMessage}
              style={{
                padding: "10px 18px",
                borderRadius: 20,
                border: "none",
                backgroundColor: "#007bff",
                color: "white",
                cursor: "pointer",
                fontSize: 14,
              }}>
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatWidget;
