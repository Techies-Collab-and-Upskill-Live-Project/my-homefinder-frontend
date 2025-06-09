import React, { useState, useEffect } from "react";
import AllMessages from "../Components/AllMessages";
import MessageDetails from "../Components/MessageDetails";

const Messages = () => {
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);

  const handleSelectMessage = (message) => {
    setSelectedMessage(message);
  };

  const handleBack = () => {
    setSelectedMessage(null);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex flex-col w-full h-full">
      {/* Always show messages list on desktop or if no message is selected on mobile */}
      {(isDesktop || !selectedMessage) && (
        <div className="w-full border-r h-full overflow-y-auto">
          <AllMessages onSelect={handleSelectMessage} />
        </div>
      )}

      {/* Show details if message is selected */}
      {selectedMessage && (
        <div className="w-full h-full overflow-y-auto">
          <MessageDetails message={selectedMessage} onBack={handleBack} />
        </div>
      )}
    </div>
  );
};

export default Messages;
