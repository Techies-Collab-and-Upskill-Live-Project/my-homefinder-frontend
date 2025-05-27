import React, { useState } from "react";
import AllMessages from "../Components/AllMessages";
import MessageDetails from "../Components/MessageDetails";

const Messages = () => {
  const [selectedMessage, setSelectedMessage] = useState(null);

  return (
    <>
      <AllMessages onSelect={setSelectedMessage} />
      <MessageDetails message={selectedMessage} />
    </>
  );
};

export default Messages;
