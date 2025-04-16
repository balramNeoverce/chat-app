import React, { useEffect, useState, useRef } from "react";
import "./index.css";
import { auth, db } from "./firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc, serverTimestamp, query, orderBy, onSnapshot } from "firebase/firestore";

const Conversation = () => {
  const messageEndRef = useRef(null);
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [loginData, setLoginData] = useState({ email: "", password: "" });

  useEffect(() => {
    const unsubscribe = auth?.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) return;
    const q = query(collection(db, "chat"), orderBy("createdAt"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = [];
      snapshot.forEach((doc) => msgs.push({ id: doc.id, ...doc.data() }));
      setMessages(msgs);
      scrollToBottom();
    });
    return () => unsubscribe();
  }, [user]);

  const scrollToBottom = () => {
    const container = messageEndRef.current;
    if (container) container.scrollTop = container.scrollHeight;
  };

  const handleLogin = async () => {
    try {
      const res = await signInWithEmailAndPassword(auth, loginData.email, loginData.password);
      setUser(res.user);
    } catch (err) {
      alert("Login failed: " + err.message);
    }
  };

  const sendMessage = async () => {
    if (!message.trim()) return;
    if (!user) {
      alert("Please login to send a message.");
      return;
    }
    await addDoc(collection(db, "chat"), {
      text: message,
      senderId: user.uid,
      createdAt: serverTimestamp(),
    });
    setMessage("");
  };

  if (!user) {
    return (
      <div className="chat-container">
        <div className="login-box">
          <h2>Login to Chat</h2>
          <input
            type="email"
            placeholder="Email"
            value={loginData.email}
            onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            value={loginData.password}
            onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
          />
          <button onClick={handleLogin}>Login</button>
        </div>
      </div>
    );
  }

  return (
    <div className="chat-container">
      <div className="header">
        <img src="https://agent-dev.yoloh.net/favicon.ico" alt="assistant logo" className="avatar" />
        <h2>Andi</h2>
        <p>Personal Insurance Assistant</p>
      </div>
      <div className="messages" ref={messageEndRef}>
        {messages.map((item) => (
          <div
            key={item.id}
            className={`message ${item.senderId === user.uid ? "justify-content-end" : ""}`}
          >
            <div className={`message-bubble ${item.senderId === user.uid ? "sender" : ""}`}>
              {item.text}
            </div>
          </div>
        ))}
      </div>
      <div className="message-input">
        <input
          type="text"
          placeholder="Type your message..."
          value={message}
          onKeyDown={(event) => {
            if (event.key === "Enter") sendMessage();
          }}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={sendMessage} disabled={!message.trim().length}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Conversation;
