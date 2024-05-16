import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@material-ui/core";
import axios from "axios";

const ChangePasswordForm = ({ open, handleClose }) => {
  const [password, setPassword] = useState("");

  const handleChangePassword = async () => {
    if (!password) {
      alert("Password field cannot be empty");
      return;
    }

    const userId = localStorage.getItem("userId");

    try {
      // Make API request to update password
      await axios.put(`http://localhost:5000/users`, { userId, password });

      alert("Password changed successfully");
      handleClose();
    } catch (error) {
      console.error(error);

      alert(error.response.data.message);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="change-password-dialog-title">
      <DialogTitle id="change-password-dialog-title">Change Password</DialogTitle>
      <DialogContent>
        <TextField
          type="password"
          label="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleChangePassword} color="primary">
          Change
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ChangePasswordForm;