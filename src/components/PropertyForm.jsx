import React, { Component } from "react";

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
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={this.handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={this.handleInputChange}
            required
          />
        </div>
        <button type="submit">Add Property</button>
      </form>
    );
  }
}

export default PropertyForm;