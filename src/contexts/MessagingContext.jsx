import { createContext, useContext, useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import { messagingAPI } from "../utils/api";
import { useAuth } from "./AuthContext";

const MessagingContext = createContext();

export const MessagingProvider = ({ children }) => {
  const socketRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [loading, setLoading] = useState(false); // Set to false since we're not loading from API
  const [currentConversationId, setCurrentConversationId] = useState(null);
  const { user } = useAuth();

  // No longer calling non-existent endpoints
  const loadConversations = async () => {
    // Conversations will be created dynamically from WebSocket messages
    setConversations([]);
    setLoading(false);
  };

  const loadMessages = async (conversationId) => {
    // Messages will be loaded from WebSocket messages
    setMessages([]);
    setCurrentConversationId(conversationId);
  };

  const markConversationAsRead = async (conversationId) => {
    // Just update local state for now
    setConversations((prev) =>
      prev.map((conv) =>
        conv.id === conversationId ? { ...conv, unreadCount: 0 } : conv
      )
    );
  };

  useEffect(() => {
    // Load conversations when component mounts (empty for now)
    loadConversations();
  }, []);

  useEffect(() => {
    // Get JWT token from localStorage or context
    const jwtToken = JSON.parse(localStorage.getItem("user"))?.token.token;
    // Connect to socket using Socket.IO
    socketRef.current = io("https://my-homefinder-backend.onrender.com", {
      auth: {
        token: jwtToken,
      },
      transports: ["websocket"],
      timeout: 10000,
    });

    socketRef.current.on("connect", () => {
      // console.log("✅ Connected to Socket.IO WebSocket");
      // console.log("🔌 Socket ID:", socketRef.current.id);
      setIsConnected(true);
    });

    socketRef.current.on("disconnect", (reason) => {
      console.log("❌ Socket.IO disconnected:", reason);
      setIsConnected(false);
    });

    socketRef.current.on("connect_error", (error) => {
      console.error("❌ Socket.IO connection error:", error.message);
      console.error("❌ Error details:", error);
      setIsConnected(false);
    });

    // Add more event listeners for debugging
    socketRef.current.on("reconnect", (attemptNumber) => {
      console.log("🔄 Socket.IO reconnected after", attemptNumber, "attempts");
      setIsConnected(true);
    });

    socketRef.current.on("reconnect_attempt", (attemptNumber) => {
      console.log("🔄 Socket.IO reconnection attempt:", attemptNumber);
    });

    socketRef.current.on("reconnect_error", (error) => {
      console.error("❌ Socket.IO reconnection error:", error);
    });

    socketRef.current.on("reconnect_failed", () => {
      console.error("❌ Socket.IO reconnection failed");
    });

    socketRef.current.on("message", (data) => {
      console.log("📨 Received new message:", data);

      // Add new message to messages array
      setMessages((prev) => [...prev, data]);

      // Update conversations with new message
      setConversations((prev) => {
        const existingConversation = prev.find(
          (conv) =>
            conv.id === data.conversationId ||
            (conv.participants && conv.participants.includes(data.senderId))
        );

        if (existingConversation) {
          // Update existing conversation
          return prev.map((conv) =>
            conv.id === existingConversation.id
              ? {
                  ...conv,
                  lastMessage: data,
                  lastMessageTime: data.createdAt,
                  unreadCount:
                    conv.unreadCount + (data.senderId !== user?.id ? 1 : 0),
                }
              : conv
          );
        } else {
          // Create new conversation
          const newConversation = {
            id: data.conversationId || Date.now().toString(),
            participants: [data.senderId, data.receiverId],
            lastMessage: data,
            lastMessageTime: data.createdAt,
            unreadCount: data.senderId !== user?.id ? 1 : 0,
            contact:
              data.senderId === user?.id ? data.receiverId : data.senderId,
          };
          return [newConversation, ...prev];
        }
      });
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, [user?.id]);

  const sendMessage = async (msg) => {
    if (!socketRef.current || !socketRef.current.connected) {
      console.error("Socket not connected");
      return;
    }

    try {
      // Prepare message data for WebSocket
      const messageData = {
        ...msg,
        senderId: user?.id || "currentUser",
        conversationId: currentConversationId,
        createdAt: new Date().toISOString(),
      };

      // Send through WebSocket for real-time delivery
      socketRef.current.emit("message", messageData);

      // Add to local messages immediately for UI update
      setMessages((prev) => [...prev, messageData]);

      // Try to send to backend API for persistence (optional)
      try {
        const savedMessage = await messagingAPI.sendMessage(messageData);
        console.log("✅ Message sent to backend:", savedMessage);
      } catch (apiError) {
        console.log(
          "⚠️ Backend message endpoint not available, but WebSocket message sent"
        );
      }

      console.log("✅ Message sent successfully via WebSocket");
    } catch (error) {
      console.error("❌ Failed to send message:", error);
      // Still add to UI for optimistic update
      setMessages((prev) => [...prev, msg]);
    }
  };

  const selectConversation = async (conversationId) => {
    if (conversationId === currentConversationId) return;

    // Mark previous conversation as read
    if (currentConversationId) {
      await markConversationAsRead(currentConversationId);
    }

    // Load messages for new conversation
    await loadMessages(conversationId);
  };

  return (
    <MessagingContext.Provider
      value={{
        messages,
        conversations,
        sendMessage,
        isConnected,
        loading,
        selectConversation,
        currentConversationId,
        loadConversations,
        socketRef: socketRef.current,
      }}
    >
      {children}
    </MessagingContext.Provider>
  );
};

export const useMessaging = () => useContext(MessagingContext);
