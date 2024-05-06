import React, { Component } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from "@material-ui/core";

class PropertyEdit extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      name: props.property.name,
      description: props.property.description,
      // Add other fields here based on your property data structure
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const updatedProperty = {
      ...this.props.property,
      name: this.state.name,
      description: this.state.description,
      // Add other fields here based on your property data structure
    };

    // Call the parent component's updateProperty function
    this.props.updateProperty(updatedProperty);
  };

  render() {
    const { property, closeModal } = this.props;

    return (
      <Dialog open={true} onClose={closeModal}>
        <DialogTitle>Edit Property</DialogTitle>
        <DialogContent>
          <form onSubmit={this.handleSubmit}>
            <TextField
              label="Name"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Description"
              name="description"
              value={this.state.description}
              onChange={this.handleChange}
              fullWidth
              multiline
              rows={4}
              margin="normal"
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button type="submit" onClick={this.handleSubmit} color="primary">
            Save
          </Button>
          <Button onClick={closeModal} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default PropertyEdit;