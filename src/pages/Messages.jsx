import React, { useState } from "react";
import AllMessages from "../Components/AllMessages";
import MessageDetails from "../Components/MessageDetails";

const Messages = () => {
  const [selectedMessage, setSelectedMessage] = useState(null);

  const handleSelectMessage = (message) => {
    setSelectedMessage(message);
  };

  const handleBack = () => {
    setSelectedMessage(null);
  };

  return (
    <>
      {!selectedMessage ? (
        <AllMessages onSelect={handleSelectMessage} />
      ) : (
        <MessageDetails message={selectedMessage} onBack={handleBack} />
      )}
    </>
  );
};

export default Messages;
