import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from "@material-ui/core";

const MessageInfo = ({ message, closeModal }) => {
  return (
    <Dialog open={true} onClose={closeModal}>
      <DialogTitle>{message.name}</DialogTitle>
      <DialogContent>
        <Typography>{message.email}</Typography>
        <Typography>{message.message}</Typography>
        <Typography>{message.date}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeModal} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MessageInfo;