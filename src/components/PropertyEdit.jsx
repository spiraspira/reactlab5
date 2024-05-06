import React, { Component } from "react";

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
      <div className="modal-container">
        <div className="modal-content">
          <h2>Edit Property</h2>
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
            />
            <label htmlFor="description">Description:</label>
<textarea
  name="description"
  value={this.state.description}
  onChange={this.handleChange}
/>
            <div className="modal-buttons">
              <button type="submit">Save</button>
              <button onClick={closeModal}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default PropertyEdit;