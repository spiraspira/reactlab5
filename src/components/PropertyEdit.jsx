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
import { updateProperty } from "../actions/propertyActions";

const PropertyEdit = ({ property, closeModal, updateProperty }) => {
  const [name, setName] = useState(property.name);
  const [description, setDescription] = useState(property.description);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "name") {
      setName(value);
    } else if (name === "description") {
      setDescription(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedProperty = {
      ...property,
      name: name,
      description: description,
    };

    updateProperty(updatedProperty);
  };

  return (
    <Dialog open={true} onClose={closeModal}>
      <DialogTitle>Edit Property</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            name="name"
            value={name}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Description"
            name="description"
            value={description}
            onChange={handleChange}
            fullWidth
            multiline
            rows={4}
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

export default connect(null, { updateProperty })(PropertyEdit);