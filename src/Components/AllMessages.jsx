import React, { useState } from "react";
import { useMessaging } from "../contexts/MessagingContext";

const AllMessages = ({ onSelect }) => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const { conversations, isConnected, loading, selectConversation } = useMessaging();

  const handleSelect = async (conversation, index) => {
    setSelectedIndex(index);
    
    // Select conversation in context
    await selectConversation(conversation.id);
    
    // Convert conversation to format expected by MessageDetails
    const messageForDetails = {
      contact: conversation.contact,
      propertyId: conversation.lastMessage?.propertyId || "123",
      conversationId: conversation.id,
    };
    
    onSelect(messageForDetails);
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);

    if (diffInHours < 1) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (diffInHours < 24) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
  };

  if (loading) {
    return (
      <aside className="lg:w-[400px] w-full fixed left-0 top-0 h-screen border-r border-green-300 bg-white overflow-y-auto">
        <div className="sticky top-0 bg-white right-0 w-full p-4 border-b border-green-300">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-semibold text-green-800">Chats</h2>
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></span>
              <span className="text-xs text-gray-500">{isConnected ? 'Online' : 'Offline'}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto mb-2"></div>
            <p className="text-gray-500">Loading conversations...</p>
          </div>
        </div>
      </aside>
    );
  }

  return (
    <aside className="lg:w-[400px] w-full fixed left-0 top-0 h-screen border-r border-green-300 bg-white overflow-y-auto">
      <div className="sticky top-0 bg-white right-0 w-full p-4 border-b border-green-300">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-semibold text-green-800">Chats</h2>
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></span>
            <span className="text-xs text-gray-500">{isConnected ? 'Online' : 'Offline'}</span>
          </div>
        </div>
        {conversations.length === 0 && (
          <p className="text-sm text-gray-500">No conversations yet</p>
        )}
      </div>
      
      <div>
        {conversations.map((conversation, index) => {
          const isSelected = index === selectedIndex;
          const lastMessage = conversation.lastMessage;
          const isFromCurrentUser = lastMessage?.senderId === "currentUser";
          
          return (
            <div
              key={conversation.id}
              className={`flex cursor-pointer border-b border-green-100 items-center gap-4 p-4 transition-all duration-200 
              ${
                isSelected
                  ? "bg-green-800/10 text-green-800"
                  : "hover:bg-green-100/40"
              }`}
              onClick={() => handleSelect(conversation, index)}
            >
              <div className="w-12 h-12 border-2 border-green-400 rounded-full bg-slate-500 flex items-center justify-center text-white font-bold">
                {conversation.contact?.charAt(0).toUpperCase()}
              </div>
              <div className="w-full">
                <div className="flex justify-between items-center mb-2 text-sm font-medium">
                  <span>{conversation.contact}</span>
                  <span className="text-xs text-gray-500">
                    {lastMessage ? formatTime(lastMessage.createdAt) : ''}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-600">
                    {lastMessage ? (
                      <>
                        {isFromCurrentUser && "You: "}
                        {lastMessage.content.length > 40
                          ? `${lastMessage.content.slice(0, 40)}...`
                          : lastMessage.content}
                      </>
                    ) : (
                      "No messages yet"
                    )}
                  </p>
                  {conversation.unreadCount > 0 && (
                    <span className="bg-green-700 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center ml-2">
                      {conversation.unreadCount}
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