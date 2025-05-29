import React, { useState } from "react";
import { messages } from "../data/data";

const AllMessages = ({ onSelect }) => {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleSelect = (message, index) => {
    setSelectedIndex(index);
    onSelect(message);
  };

  return (
    <aside className="lg:w-[400px] fixed left-0 top-0 h-screen border-r border-green-300 bg-white overflow-y-auto">
      <h2 className="text-xl sticky top-0 bg-white right-0 w-full font-semibold text-green-800 p-4 border-b border-green-300">
        Chats
      </h2>
      <div>
        {messages.map((message, index) => {
          const isSelected = index === selectedIndex;
          return (
            <div
              key={index}
              className={`flex cursor-pointer border-b border-green-100 items-center gap-4 p-4 transition-all duration-200 
              ${
                isSelected
                  ? "bg-green-800/10 text-green-800"
                  : "hover:bg-green-100/40"
              }`}
              onClick={() => handleSelect(message, index)}
            >
              <div className="w-12 h-12 border-2 border-green-400 rounded-full bg-slate-500 flex items-center justify-center text-white font-bold">
                {message.contact?.charAt(0).toUpperCase()}
              </div>
              <div className="w-full">
                <div className="flex justify-between items-center mb-2 text-sm font-medium">
                  <span>{message.contact}</span>
                  <span className="text-xs text-gray-500">{message.time}</span>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-sm">
                    {message.text.length > 40
                      ? `${message.text.slice(0, 40)}...`
                      : message.text}
                  </p>{" "}
                  {message.badge > 0 && (
                    <span className="bg-green-700 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center ml-2">
                      {message.badge}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </aside>
  );
};

export default AllMessages;
