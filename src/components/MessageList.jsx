import React, { Component } from "react";
import { Typography, List, ListItem, ListItemText, Button } from "@material-ui/core";
import MessageInfo from "./MessageInfo";
import MessageForm from "./MessageForm";
import MessageEdit from "./MessageEdit";
import messagesData from "../data/messages.json";

class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedMessage: null,
      isModalOpen: false,
      isEditModalOpen: false,
      messages: messagesData
    };
  }

  handleMessageClick = (message) => {
    this.setState({
      selectedMessage: message,
      isModalOpen: true
    });
  };

  handleEditClick = (message) => {
    this.setState({
      selectedMessage: message,
      isEditModalOpen: true
    });
  };

  closeModal = () => {
    this.setState({
      selectedMessage: null,
      isModalOpen: false,
      isEditModalOpen: false
    });
  };

  updateMessage = (updatedMessage) => {
    // Update the message in the state
    this.setState((prevState) => ({
      messages: prevState.messages.map((message) =>
        message.id === updatedMessage.id ? updatedMessage : message
      ),
      isEditModalOpen: false
    }));
  };

  deleteMessage = (message) => {
    this.setState((prevState) => ({
      messages: prevState.messages.filter((item) => item.id !== message.id)
    }));
  };

  addMessage = (newMessage) => {
    this.setState((prevState) => ({
      messages: [...prevState.messages, newMessage]
    }));
  };

  render() {
    const { messages } = this.state;
    const { selectedMessage, isModalOpen, isEditModalOpen } = this.state;

    return (
      <section className="message-list">
        <Typography variant="h2">Сообщения</Typography>
        <List style={{ margin: 0, padding: 0 }}>
          {messages.map((message) => (
            <ListItem key={message.id} style={{ marginBottom: "10px" }}>
              <ListItemText primary={message.name + " " + message.date} />
              <Button onClick={() => this.handleMessageClick(message)}>
                View
              </Button>
              <Button onClick={() => this.deleteMessage(message)}>
                Delete
              </Button>
              <Button onClick={() => this.handleEditClick(message)}>Edit</Button>
            </ListItem>
          ))}
        </List>
        {isModalOpen && (
          <MessageInfo message={selectedMessage} closeModal={this.closeModal} />
        )}
        {isEditModalOpen && (
          <MessageEdit
            message={selectedMessage}
            closeModal={this.closeModal}
            updateMessage={this.updateMessage}
          />
        )}
        <Typography variant="h2">Новое сообщение</Typography>
        <MessageForm addMessage={this.addMessage} />
      </section>
    );
  }
}

export default MessageList;