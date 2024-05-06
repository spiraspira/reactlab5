import React, { useEffect, useState } from "react";
import MessageList from "../components/MessageList";
import messagesData from "../data/messages.json";

const Messages = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages(messagesData);
  }, []);

  return <MessageList Messages={messages} />;
};

export default Messages;