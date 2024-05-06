import React, { Component } from "react";
import { TextField, Button } from "@material-ui/core";

class PropertyForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: ""
    };
  }

  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { name, description } = this.state;

    // Create a new property object
    const newProperty = {
      id: Date.now(),
      name,
      description
    };

    // Call the addProperty function passed in props
    this.props.addProperty(newProperty);

    // Clear the form inputs
    this.setState({
      name: "",
      description: ""
    });
  };

  render() {
    const { name, description } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <TextField
            label="Name"
            id="name"
            name="name"
            value={name}
            onChange={this.handleInputChange}
            required
          />
        </div>
        <div>
          <TextField
            label="Description"
            id="description"
            name="description"
            value={description}
            onChange={this.handleInputChange}
            required
            multiline
            rows={4}
          />
        </div>
        <Button type="submit" variant="contained" color="primary">
          Add Property
        </Button>
      </form>
    );
  }
}

export default PropertyForm;