import { createContext, useContext, useEffect, useRef, useState } from "react";

const MessagingContext = createContext();

export const MessagingProvider = ({ children }) => {
  const socketRef = useRef(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Connect to socket
    socketRef.current = new WebSocket(import.meta.env.VITE_WEBSOCKET_URL);

    socketRef.current.onopen = () => {
      console.log("✅ Connected to WebSocket");
    };

    socketRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMessages((prev) => [...prev, data]);
    };

    socketRef.current.onerror = (error) => {
      console.error("WebSocket Error:", error);
    };

    return () => {
      socketRef.current.close();
    };
  }, []);

  const sendMessage = (msg) => {
    socketRef.current.send(JSON.stringify(msg));
    setMessages((prev) => [...prev, msg]); // Optional: optimistic update
  };

  return (
    <MessagingContext.Provider value={{ messages, sendMessage }}>
      {children}
    </MessagingContext.Provider>
  );
};

export const useMessaging = () => useContext(MessagingContext);
