import React, { useRef } from "react";
import "./index.css";
import { useState } from "react";

const Conversation = () => {
  const messageEndRef = useRef(null);

  const [messages, setMessages] = useState([
    { id: 1, text: "Hello!" },
    { id: 2, text: "How are you?" },
    { id: 3, text: "I'm good, thanks!" },
    { id: 4, text: "Great to hear!" },
    { id: 5, text: "Hello! I'm your friendly AI assistant." },
    { id: 6, text: "Let's begin with some basic information." },
    { id: 7, text: "What type of insurance are you looking for?" },
    { id: 8, text: "Great, let me help you with that." },
  ]);
  const scrollToBottom = () => {
    const container = messageEndRef.current;
    container.scrollTop = container.scrollHeight;
  };
  const [message, setMessage] = useState("");
  const sendMessage = () => {
    messages?.push({ id: messages?.length, text: message });
    setMessages([...messages]);
    setMessage("");
    setTimeout(() => {
      scrollToBottom();
    }, 300);
  };
  return (
    <div className="chat-container">
      <div className="header">
        <img
          src="https://agent-dev.yoloh.net/favicon.ico"
          alt="assistant logo"
          className="avatar"
        />
        <h2>Andi</h2>
        <p>Personal Insurance Assistant</p>
      </div>
      <div className="messages" ref={messageEndRef}>
        {messages?.map((item, index) => {
          return (
            <div
              className={`message ${
                item?.id % 2 === 0 ? "justify-content-end" : ""
              }`}
              key={index}
            >
              <div className={`message-bubble ${
                item?.id % 2 === 0 ? "sender" : ""
              }`}>{item?.text}</div>
            </div>
          );
        })}
      </div>
      <div className="message-input">
        <input
          type="text"
          placeholder="Type your message..."
          value={message}
          onKeyDown={(event) => {
            if (event.key === "Enter" && message?.trim()?.length > 0) {
              sendMessage();
            }
          }}
          onChange={(event) => setMessage(event?.target?.value)}
        />
        <button onClick={sendMessage} disabled={!message?.trim()?.length > 0}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Conversation;
