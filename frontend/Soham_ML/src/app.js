import React from "react";
import ChatWidget from "./ChatWidget";

function App() {
  return (
    <div style={{ padding: "50px", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
      <h1>Welcome to My Website</h1>
      <p>
        This is a sample page demonstrating how the AI assistant icon can be added.
        You can scroll, read content, and the chat widget will stay at the bottom right corner.
      </p>

      <p>
        You can implement this chat widget on any page by importing <code>ChatWidget</code>.
      </p>

      {/* Chat Widget icon and chat window */}
      <ChatWidget />
    </div>
  );
}

export default App;
