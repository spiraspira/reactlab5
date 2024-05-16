import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Typography, List, ListItem, ListItemText, Button } from "@material-ui/core";
import MessageInfo from "./MessageInfo";
import MessageForm from "./MessageForm";
import MessageEdit from "./MessageEdit";
import {
  addMessage,
  updateMessage,
  deleteMessage,
  sortMessagesByDateAsc,
  fetchMessages
} from "../actions/messageActions";

const MessageList = ({
  messages,
  addMessage,
  updateMessage,
  deleteMessage,
  sortMessagesByDateAsc,
  fetchMessages
}) => {
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const userRole = localStorage.getItem("role");

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

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

  const handleDownloadJson = () => {
    const json = JSON.stringify(messages.messages, null, 2);
    const element = document.createElement("a");
    const file = new Blob([json], { type: "application/json" });
    element.href = URL.createObjectURL(file);
    element.download = "messages.json";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <section className="message-list">
      <Typography variant="h2">Сообщения</Typography>
      <Button onClick={handleSortMessagesByDate}>Сортировать по дате</Button>
      <Button onClick={handleDownloadJson}>Скачать JSON</Button>
      <List style={{ margin: 0, padding: 0 }}>
        {messages.messages.map((message) => (
          <ListItem key={message.Id} style={{ marginBottom: "10px" }}>
            <ListItemText
              primary={message.name + new Date(message.date).toLocaleString()}
            />
            <Button onClick={() => handleMessageClick(message)}>Просмотр</Button>
            {userRole !== "user" && (
              <>
                <Button onClick={() => handleDeleteMessage(message)}>Удалить</Button>
                <Button onClick={() => handleEditClick(message)}>Редактировать</Button>
              </>
            )}
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
  sortMessagesByDateAsc,
  fetchMessages
})(MessageList);