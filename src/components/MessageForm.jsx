import React, { Component } from "react";

class MessageForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      message: "",
      date: "",
      email: ""
    };
  }

  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { name, message, date, email } = this.state;

    // Create a new message object
    const newMessage = {
      id: Date.now(),
      name,
      message,
      date,
      email
    };

    // Call the addMessage function passed in props
    this.props.addMessage(newMessage);

    // Clear the form inputs
    this.setState({
      name: "",
      message: "",
      date: "",
      email: ""
    });
  };

  render() {
    const { name, message, date, email } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={this.handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            name="email"
            value={email}
            onChange={this.handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="message">Description:</label>
          <textarea
            id="message"
            name="message"
            value={message}
            onChange={this.handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="date">Date:</label>
          <input
            type="text"
            id="date"
            name="date"
            value={date}
            onChange={this.handleInputChange}
            required
          />
        </div>
        <button type="submit">Add Message</button>
      </form>
    );
  }
}

export default MessageForm;