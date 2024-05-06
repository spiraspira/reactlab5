import React, { Component } from "react";

class MessageEdit extends Component {
    constructor(props) {
        super(props);
      
        this.state = {
          name: props.message.name,
          message: props.message.message,
          date: props.message.date,
          email: props.message.email
        };
      }

      handleChange = (e) => {
        this.setState({
          [e.target.name]: e.target.value
        });
      };

  handleSubmit = (e) => {
    e.preventDefault();

    const updatedMessage = {
        ...this.props.message,
        name: this.state.name,
        message: this.state.message,
        date: this.state.date,
        email: this.state.email
      };

    this.props.updateMessage(updatedMessage);
  };

  render() {
    const { message, closeModal } = this.props;

    return (
      <div className="modal-container">
        <div className="modal-content">
          <h2>Edit Message</h2>
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
            />
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
            <label htmlFor="message">Description:</label>
            <textarea
             name="message"
            value={this.state.message}
            onChange={this.handleChange}
            />
            <label htmlFor="date">Date:</label>
            <input
              type="text"
              name="date"
              value={this.state.date}
              onChange={this.handleChange}
            />
            <div className="modal-buttons">
              <button type="submit">Save</button>
              <button onClick={closeModal}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default MessageEdit;