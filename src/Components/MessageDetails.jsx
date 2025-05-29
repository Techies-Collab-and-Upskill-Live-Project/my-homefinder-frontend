import React, { useEffect, useState } from "react";
import { Picker } from "emoji-mart";
import { Phone, SmileyIcon, VideoCameraIcon } from "@phosphor-icons/react";
import { ArrowLeft } from "@phosphor-icons/react";

const MessageDetails = ({ message, onBack }) => {
  const [chat, setChat] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  // Load initial message when `message` prop updates
  useEffect(() => {
    if (message) {
      setChat([
        {
          text: message.text,
          time: message.time,
          fromUser: false,
        },
      ]);
    }
  }, [message]);

  const handleSend = () => {
    if (newMessage.trim()) {
      setChat((prevChat) => [
        ...prevChat,
        { text: newMessage, time: "Now", fromUser: true },
      ]);
      setNewMessage("");
    }
  };

  const addEmoji = (emoji) => {
    setNewMessage((prev) => prev + emoji.native);
    setShowEmojiPicker(false);
  };

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
          {message.contact}
        </div>

        <span className="flex items-center gap-4">
          <VideoCameraIcon size={25} />
          <Phone size={25} />
        </span>
      </div>

      {/* Chat bubbles */}
      <div className="flex-1 overflow-y-auto space-y-4 p-6">
        {chat.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.fromUser ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-xs md:max-w-md px-4 py-2 rounded-lg shadow border break-words
          ${
            msg.fromUser
              ? "bg-green-100 text-right border-green-300"
              : "bg-white text-left border-gray-300"
          }`}
            >
              <p className="text-sm text-gray-800 break-words whitespace-pre-wrap">
                {msg.text}
              </p>
              <p className="text-[10px] text-gray-400 mt-1">{msg.time}</p>
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
          {/* 
          {showEmojiPicker && (
            <div className="absolute bottom-12 z-10">
              <Picker onSelect={addEmoji} theme="light" />
            </div>
          )} */}

          <textarea
            type="text"
            rows="1"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value.replace(/\n$/, ""))}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            className="flex-1 p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            onClick={handleSend}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessageDetails;
