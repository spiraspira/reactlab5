import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from "@material-ui/core";

const PropertyEdit = (props) => {
  const [name, setName] = useState(props.property.name);
  const [description, setDescription] = useState(props.property.description);

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
      ...props.property,
      name: name,
      description: description,
    };

    props.updateProperty(updatedProperty);
  };

  const { property, closeModal } = props;

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
        </form>
      </DialogContent>
      <DialogActions>
        <Button type="submit" onClick={handleSubmit} color="primary">
          Save
        </Button>
        <Button onClick={closeModal} color="secondary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PropertyEdit;