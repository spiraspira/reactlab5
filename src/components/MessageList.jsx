import React, { useState } from "react";
import { connect } from "react-redux";
import { Typography, List, ListItem, ListItemText, Button } from "@material-ui/core";
import MessageInfo from "./MessageInfo";
import MessageForm from "./MessageForm";
import MessageEdit from "./MessageEdit";
import {
  addMessage,
  updateMessage,
  deleteMessage,
  sortMessagesByDateAsc
} from "../actions/messageActions";

const MessageList = ({
  messages,
  addMessage,
  updateMessage,
  deleteMessage,
  sortMessagesByDateAsc
}) => {
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

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

  const handleAddMessage = (message) => {
    addMessage(message);
  };

  const handleUpdateMessage = (message) => {
    updateMessage(message);
  };

  const handleDeleteMessage = (message) => {
    deleteMessage(message);
  };

  const handleSortMessagesByDate = () => {
    sortMessagesByDateAsc();
  };

  return (
    <section className="message-list">
      <Typography variant="h2">Сообщения</Typography>
      <Button onClick={handleSortMessagesByDate}>Sort by Date</Button>
      <List style={{ margin: 0, padding: 0 }}>
        {messages.messages.map((message) => (
          <ListItem key={message.id} style={{ marginBottom: "10px" }}>
            <ListItemText primary={message.name + " " + message.date} />
            <Button onClick={() => handleMessageClick(message)}>View</Button>
            <Button onClick={() => handleDeleteMessage(message)}>Delete</Button>
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
          updateMessage={handleUpdateMessage}
        />
      )}
      <Typography variant="h2">Новое сообщение</Typography>
      <MessageForm addMessage={handleAddMessage} />
    </section>
  );
};

const mapStateToProps = (state) => ({
  messages: state.messages
});

export default connect(mapStateToProps, {
  addMessage,
  updateMessage,
  deleteMessage,
  sortMessagesByDateAsc
})(MessageList);