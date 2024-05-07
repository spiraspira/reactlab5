import React, { useState } from "react";
import { Typography, List, ListItem, ListItemText, Button } from "@material-ui/core";
import MessageInfo from "./MessageInfo";
import MessageForm from "./MessageForm";
import MessageEdit from "./MessageEdit";
import messagesData from "../data/messages.json";

const MessageList = () => {
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [messages, setMessages] = useState(messagesData);

  const handleMessageClick = (message) => {
    setSelectedMessage(message);
    setIsModalOpen(true);
  };

  const handleEditClick = (message) => {
    setSelectedMessage(message);
    setIsEditModalOpen(true);
  };

  const closeModal = () => {
    setSelectedMessage(null);
    setIsModalOpen(false);
    setIsEditModalOpen(false);
  };

  const updateMessage = (updatedMessage) => {
    setMessages((prevMessages) =>
      prevMessages.map((message) =>
        message.id === updatedMessage.id ? updatedMessage : message
      )
    );
    setIsEditModalOpen(false);
  };

  const deleteMessage = (message) => {
    setMessages((prevMessages) =>
      prevMessages.filter((item) => item.id !== message.id)
    );
  };

  const addMessage = (newMessage) => {
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  const sortMessagesByDate = () => {
    setMessages((prevMessages) =>
      [...prevMessages].sort((a, b) => new Date(a.date) - new Date(b.date))
    );
  };

  return (
    <section className="message-list">
      <Typography variant="h2">Сообщения</Typography>
      <Button onClick={sortMessagesByDate}>Sort by Date</Button>
      <List style={{ margin: 0, padding: 0 }}>
        {messages.map((message) => (
          <ListItem key={message.id} style={{ marginBottom: "10px" }}>
            <ListItemText primary={message.name + " " + message.date} />
            <Button onClick={() => handleMessageClick(message)}>View</Button>
            <Button onClick={() => deleteMessage(message)}>Delete</Button>
            <Button onClick={() => handleEditClick(message)}>Edit</Button>
          </ListItem>
        ))}
      </List>
      {isModalOpen && (
        <MessageInfo message={selectedMessage} closeModal={closeModal} />
      )}
      {isEditModalOpen && (
        <MessageEdit
          message={selectedMessage}
          closeModal={closeModal}
          updateMessage={updateMessage}
        />
      )}
      <Typography variant="h2">Новое сообщение</Typography>
      <MessageForm addMessage={addMessage} />
    </section>
  );
};

export default MessageList;