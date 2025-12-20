import React, { useState } from "react";
import "./chatbot.css";

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  // Send message to backend
  async function sendToAI() {
    if (!input.trim()) return;

    // Add user message
    const userMsg = { from: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);

    // Send to backend
    const res = await fetch("http://localhost:5000/api/ai/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input }),
    });

    const data = await res.json();

    // Add AI message
    const aiMsg = { from: "ai", text: data.reply };
    setMessages((prev) => [...prev, aiMsg]);

    setInput("");
  }

  return (
    <>
      {/* floating button */}
      <button className="chatbot-btn" onClick={() => setOpen(!open)}>
        💬
      </button>

      {open && (
        <div className="chatbot-box">
          <div className="chatbot-header">AI Assistant</div>

          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={msg.from === "user" ? "msg user" : "msg ai"}
              >
                {msg.text}
              </div>
            ))}
          </div>

          <div className="chatbot-input">
            <input
              type="text"
              placeholder="Ask me anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button onClick={sendToAI}>Send</button>
          </div>
        </div>
      )}
    </>
  );
}
