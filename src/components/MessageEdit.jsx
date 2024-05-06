import React, { Component } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from "@material-ui/core";

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
      <Dialog open={true} onClose={closeModal}>
        <DialogTitle>Edit Message</DialogTitle>
        <DialogContent>
          <form onSubmit={this.handleSubmit}>
            <TextField
              label="Name"
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Email"
              type="text"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Description"
              multiline
              rows={4}
              name="message"
              value={this.state.message}
              onChange={this.handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Date"
              type="text"
              name="date"
              value={this.state.date}
              onChange={this.handleChange}
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
  }
}

export default MessageEdit;