import React, { Component } from "react";
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
        <h2>Сообщения</h2>
        <ul style={{ margin: 0, padding: 0 }}>
          {messages.map((message) => (
            <li key={message.id} style={{ marginBottom: "10px" }}>
              <div>
                <h3>{message.name + " " + message.date}</h3>
                <button onClick={() => this.handleMessageClick(message)}>
                  View
                </button>
                <button onClick={() => this.deleteMessage(message)}>
                  Delete
                </button>
                <button onClick={() => this.handleEditClick(message)}>Edit</button>
              </div>
            </li>
          ))}
        </ul>
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
        <h2>Новое сообщение</h2>
        <MessageForm addMessage={this.addMessage} />
      </section>
    );
  }
}

export default MessageList;