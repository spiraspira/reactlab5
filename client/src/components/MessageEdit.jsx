import React, { useState } from "react";
import { connect } from "react-redux";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField
} from "@material-ui/core";
import { updateMessage } from "../actions/messageActions";

const MessageEdit = ({ message, closeModal, updateMessage }) => {
  const [name, setName] = useState(message.name);
  const [email, setEmail] = useState(message.email);
  const [messageText, setMessageText] = useState(message.message);

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "name":
        setName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "message":
        setMessageText(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedMessage = {
      ...message,
      name: name,
      message: messageText,
      email: email
    };
    
    updateMessage(updatedMessage);
    closeModal();
  };

  return (
    <Dialog open={true} onClose={closeModal}>
      <DialogTitle>Edit Message</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            type="text"
            name="name"
            value={name}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            type="text"
            name="email"
            value={email}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Description"
            multiline
            rows={4}
            name="message"
            value={messageText}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <DialogActions>
            <Button type="submit" color="primary">
              Save
            </Button>
            <Button onClick={closeModal} color="secondary">
              Cancel
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default connect(null, { updateMessage })(MessageEdit);