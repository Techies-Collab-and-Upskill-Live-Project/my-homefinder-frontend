import React, { useEffect, useState } from "react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { Phone, SmileyIcon, VideoCameraIcon } from "@phosphor-icons/react";
import { ArrowLeft } from "@phosphor-icons/react";
import { useMessaging } from "../contexts/MessagingContext";
import { useAuth } from "../contexts/AuthContext";

const MessageDetails = ({ message, onBack }) => {
  const [newMessage, setNewMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const { messages, sendMessage, isConnected, currentConversationId } = useMessaging();
  const { user } = useAuth();

  // Filter messages for this specific conversation
  const conversationMessages = messages.filter(msg => {
    // Check by conversationId first
    if (msg.conversationId === message?.conversationId) return true;
    
    // Check by sender/receiver matching the contact
    if (msg.senderId === message?.contact || msg.receiverId === message?.contact) return true;
    
    // Check by receiverId if available (for property conversations)
    if (message?.receiverId && (msg.receiverId === message.receiverId || msg.senderId === message.receiverId)) return true;
    
    return false;
  });



  const handleSend = () => {
    if (newMessage.trim() && message) {
      const messageData = {
        id: Date.now().toString(),
        senderId: user?.id || "currentUser",
        receiverId: message.contact,
        content: newMessage,
        propertyId: message.propertyId || "123",
        conversationId: message.conversationId,
        createdAt: new Date().toISOString(),
      };
      
      sendMessage(messageData);
      setNewMessage("");
    }
  };

  const addEmoji = (emoji) => {
    setNewMessage((prev) => prev + emoji.native);
    setShowEmojiPicker(false);
  };

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    const chatContainer = document.querySelector('.chat-messages');
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [conversationMessages]);

  if (!message) {
    return (
      <div className="lg:ml-[400px] flex items-center justify-center h-screen text-center p-8">
        <div className="text-gray-500 max-w-md">
          <img
            src="/chat_placeholder.svg"
            alt="Select message"
            className="w-40 mx-auto mb-6 opacity-70"
          />
          <h2 className="text-xl font-semibold mb-2">
            No Conversation Selected
          </h2>
          <p>Select a contact on the left to start chatting.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="lg:ml-[400px] bg-slate-200 flex flex-col h-screen">
      <div className="text-lg flex justify-between items-center font-semibold text-green-800 mb-4 border-b p-3">
        <div className="flex items-center gap-4">
          {/* Back button for mobile */}
          <button
            onClick={onBack}
            className="block lg:hidden text-green-600 hover:text-green-800"
            title="Go back"
          >
            <ArrowLeft size={24} />
          </button>

          <div className="w-12 h-12 border-2 border-green-400 rounded-full bg-slate-500 flex items-center justify-center text-white font-bold">
            {message.contact?.charAt(0).toUpperCase()}
          </div>
          <div>
            <div>{message.contact}</div>
            <div className="text-xs text-gray-500 flex items-center gap-1">
              {isConnected ? (
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              ) : (
                <span className="w-2 h-2 bg-red-500 rounded-full"></span>
              )}
              {isConnected ? "Online" : "Offline"}
            </div>
          </div>
        </div>

        <span className="flex items-center gap-4">
          <VideoCameraIcon size={25} />
          <Phone size={25} />
        </span>
      </div>

      {/* Chat bubbles */}
      <div className="flex-1 overflow-y-auto space-y-4 p-6 chat-messages">
        {conversationMessages.length === 0 && (
          <div className="text-center text-gray-500 py-8">
            <p>No messages yet. Start the conversation!</p>
          </div>
        )}
        
        {conversationMessages.map((msg, index) => (
          <div
            key={msg.id || index}
            className={`flex ${msg.senderId === (user?.id || "currentUser") ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-xs md:max-w-md px-4 py-2 rounded-lg shadow border break-words
          ${
            msg.senderId === (user?.id || "currentUser")
              ? "bg-green-100 text-right border-green-300"
              : "bg-white text-left border-gray-300"
          }`}
            >
              <p className="text-sm text-gray-800 break-words whitespace-pre-wrap">
                {msg.content}
              </p>
              <p className="text-[10px] text-gray-400 mt-1">
                {new Date(msg.createdAt).toLocaleTimeString([], { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Input field with emoji */}
      <div className="mt-4 p-4 bg-white border-t">
        <div className="flex items-center gap-2 relative">
          <button
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            className="text-2xl"
            title="Pick emoji"
          >
            <SmileyIcon />
          </button>

          {showEmojiPicker && (
            <div className="absolute bottom-14 left-0 z-50">
              <Picker data={data} onEmojiSelect={addEmoji} />
            </div>
          )}

          <textarea
            rows="1"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value.replace(/\n$/, ""))}
            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
            className="flex-1 p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
            disabled={!isConnected}
          />
          <button
            onClick={handleSend}
            disabled={!isConnected || !newMessage.trim()}
            className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg transition"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessageDetails;