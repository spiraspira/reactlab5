import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from "@material-ui/core";

const MessageEdit = ({ message, closeModal, updateMessage }) => {
  const [name, setName] = useState(message.name);
  const [email, setEmail] = useState(message.email);
  const [messageText, setMessageText] = useState(message.message);
  const [date, setDate] = useState(message.date);

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
      case "date":
        setDate(value);
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
      date: date,
      email: email
    };

    updateMessage(updatedMessage);
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
          <TextField
            label="Date"
            type="text"
            name="date"
            value={date}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <div className="modal-buttons">
            <Button type="submit" variant="contained" color="primary">
              Save
            </Button>
            <Button onClick={closeModal} variant="contained" color="secondary">
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default MessageEdit;