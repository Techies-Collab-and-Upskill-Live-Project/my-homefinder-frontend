import React, { useState, useEffect, useRef } from "react";
import { useSearchParams, useLocation } from "react-router-dom";
import AllMessages from "../components/AllMessages";
import MessageDetails from "../components/MessageDetails";
import { useMessaging } from "../contexts/MessagingContext";
import { useAuth } from "../contexts/AuthContext";

const Messages = () => {
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);
  const { isConnected, sendMessage, selectConversation } = useMessaging();
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const initialMessageSent = useRef(false);

  // Get URL parameters from HouseDetails
  const propertyId = searchParams.get('propertyId');
  const propertyTitle = searchParams.get('propertyTitle');
  const landlordId = searchParams.get('landlordId');
  const landlordName = searchParams.get('landlordName');
  const propertyData = location.state?.property;
  const landlordData = location.state?.landlord;

  // Auto-create conversation if coming from property details
  useEffect(() => {
    if (propertyId && landlordId && landlordId !== 'unknown' && !initialMessageSent.current) {
      // Create a conversation with the landlord
      const conversation = {
        id: `conv_${propertyId}_${landlordId}`,
        contact: landlordName || landlordData?.name || 'Property Owner',
        propertyId: propertyId,
        propertyTitle: propertyTitle || propertyData?.title,
        landlordId: landlordId,
        lastMessage: null,
        unreadCount: 0
      };

      const conversationId = conversation.id;
      
      setSelectedConversation({
        contact: conversation.contact,
        propertyId: conversation.propertyId,
        conversationId: conversationId,
        landlordId: conversation.landlordId,
        propertyTitle: conversation.propertyTitle,
        receiverId: landlordId // Add this for message filtering
      });

      // Set the current conversation ID in the context
      selectConversation(conversationId);

      // Send an initial message if this is a new conversation
      if (user && isConnected) {
        const initialMessage = {
          receiverId: landlordId,
          content: `Hi! I'm interested in your property "${propertyTitle || 'this property'}". Can you tell me more about it?`,
          propertyId: propertyId
        };
        
        // Send the message after a short delay to ensure context is set
        setTimeout(() => {
          sendMessage(initialMessage);
          initialMessageSent.current = true;
        }, 1000);
      }
    }
  }, [propertyId, landlordId, landlordName, propertyTitle, propertyData, landlordData, user, isConnected]);

  const handleSelectConversation = (conversation) => {
    // Convert conversation object to the format expected by MessageDetails
    const messageForDetails = {
      contact: conversation.contact,
      propertyId: conversation.lastMessage?.propertyId || "123",
      conversationId: conversation.id,
      // Add any other properties that MessageDetails might need
    };
    setSelectedConversation(messageForDetails);
  };

  const handleBack = () => {
    setSelectedConversation(null);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex flex-col w-full h-full overflow-y-auto">
      <div className="mt-20">
        {/* Connection status indicator */}
        <div className="fixed top-20 right-4 z-50">
          <div className={`px-3 py-1 rounded-full text-xs text-white ${
            isConnected ? 'bg-green-500' : 'bg-red-500'
          }`}>
            {isConnected ? '🟢 Connected' : '🔴 Disconnected'}
          </div>
        </div>

        {/* Property info banner if coming from property details */}
        {propertyId && propertyTitle && (
          <div className="fixed top-32 right-4 z-50 bg-white p-3 rounded-lg shadow-md border max-w-xs">
            <div className="text-xs text-gray-600">Messaging about:</div>
            <div className="font-medium text-sm">{propertyTitle}</div>
          </div>
        )}

        {/* Always show messages list on desktop or if no conversation is selected on mobile */}
        {(isDesktop || !selectedConversation) && (
          <div className="w-full border-r h-full overflow-y-auto">
            <AllMessages onSelect={handleSelectConversation} />
          </div>
        )}

        {/* Show details if conversation is selected */}
        {selectedConversation && (
          <div className="w-full h-full overflow-y-auto">
            <MessageDetails message={selectedConversation} onBack={handleBack} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Messages;
