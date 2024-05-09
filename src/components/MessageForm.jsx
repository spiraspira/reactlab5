import React, { useState } from "react";
import { connect } from "react-redux";
import { TextField, Button } from "@material-ui/core";
import { addMessage } from "../actions/messageActions";

const MessageForm = ({ addMessage }) => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [date, setDate] = useState("");
  const [email, setEmail] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "name":
        setName(value);
        break;
      case "message":
        setMessage(value);
        break;
      case "date":
        setDate(value);
        break;
      case "email":
        setEmail(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Create a new message object
    const newMessage = {
      id: Date.now(),
      name,
      message,
      date,
      email
    };

    // Call the addMessage function passed in props
    addMessage(newMessage);

    // Clear the form inputs
    setName("");
    setMessage("");
    setDate("");
    setEmail("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <TextField
          label="Name"
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <TextField
          label="Email"
          type="text"
          id="email"
          name="email"
          value={email}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <TextField
          label="Description"
          multiline
          rows={4}
          id="message"
          name="message"
          value={message}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <TextField
          label="Date"
          type="text"
          id="date"
          name="date"
          value={date}
          onChange={handleInputChange}
          required
        />
      </div>
      <Button type="submit" variant="contained" color="primary">
        Add Message
      </Button>
    </form>
  );
};

export default connect(null, { addMessage })(MessageForm);