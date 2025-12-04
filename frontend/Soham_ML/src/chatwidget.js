// src/ChatWidget.js
import React, { useState, useRef, useEffect } from "react";

const ChatWidget = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const chatEndRef = useRef(null);

  // Auto-scroll to latest message
  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => scrollToBottom(), [history]);

  const handleOpen = () => {
    setOpen(true);
    setHistory([
      { sender: "ai", text: "Hello! I’m your AI assistant. How can I help you today?" }
    ]);
  };

  const handleClose = () => {
    setOpen(false);
    setHistory([]);
    setInput("");
  };

  const sendMessage = async () => {
    if (!input.trim()) return;
    setHistory(prev => [...prev, { sender: "user", text: input }]);
    const userMessage = input;
    setInput("");

    try {
      const res = await fetch("https://my-ml-api-z4zs.onrender.com/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: userMessage }),
      });
      const data = await res.json();
      setHistory(prev => [...prev, { sender: "ai", text: data.answer }]);
    } catch (err) {
      console.error(err);
      setHistory(prev => [...prev, { sender: "ai", text: "Error: AI unavailable." }]);
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
            backgroundColor: "#007bff", // bright blue same as chat
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
          onClick={handleOpen}
        >
          🤖
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
            borderRadius: 10,
            boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
            backgroundColor: "#fff",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          }}
        >
          {/* Header */}
          <div
            style={{
              backgroundColor: "#007bff",
              color: "white",
              padding: "10px 15px",
              fontWeight: "bold",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            AI Assistant
            <span style={{ cursor: "pointer", fontWeight: "bold" }} onClick={handleClose}>
              ✖
            </span>
          </div>

          {/* Chat Content */}
          <div
            style={{
              flexGrow: 1,
              padding: 15,
              overflowY: "auto",
              backgroundColor: "#f9f9f9",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {history.map((chat, index) => (
              <div
                key={index}
                style={{
                  alignSelf: chat.sender === "user" ? "flex-end" : "flex-start",
                  backgroundColor: chat.sender === "user" ? "#007bff" : "#e5e5ea",
                  color: chat.sender === "user" ? "white" : "#333",
                  padding: "10px 14px",
                  borderRadius: chat.sender === "user"
                    ? "20px 20px 0px 20px"
                    : "20px 20px 20px 0px",
                  maxWidth: "70%",
                  margin: "5px 0",
                }}
              >
                {chat.text}
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* Input */}
          <div style={{ display: "flex", padding: 10, borderTop: "1px solid #ccc" }}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Type your message..."
              style={{
                flexGrow: 1,
                padding: "10px 12px",
                borderRadius: 20,
                border: "1px solid #ccc",
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
              }}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatWidget;
