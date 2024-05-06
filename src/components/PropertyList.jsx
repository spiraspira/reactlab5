import React, { Component } from "react";
import PropertyInfo from "./PropertyInfo";
import PropertyForm from "./PropertyForm";
import PropertyEdit from "./PropertyEdit";
import propertiesData from "../data/properties.json";

class PropertyList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedProperty: null,
      isModalOpen: false,
      isEditModalOpen: false,
      properties: propertiesData
    };
  }

  handlePropertyClick = (property) => {
    this.setState({
      selectedProperty: property,
      isModalOpen: true
    });
  };

  handleEditClick = (property) => {
    this.setState({
      selectedProperty: property,
      isEditModalOpen: true
    });
  };

  closeModal = () => {
    this.setState({
      selectedProperty: null,
      isModalOpen: false,
      isEditModalOpen: false
    });
  };

  updateProperty = (updatedProperty) => {
    // Update the property in the state
    this.setState((prevState) => ({
      properties: prevState.properties.map((property) =>
        property.id === updatedProperty.id ? updatedProperty : property
      ),
      isEditModalOpen: false
    }));
  };

  deleteProperty = (property) => {
    this.setState((prevState) => ({
      properties: prevState.properties.filter((item) => item.id !== property.id)
    }));
  };

  render() {
    const { properties } = this.state;
    const { selectedProperty, isModalOpen, isEditModalOpen } = this.state;

    return (
      <section className="property-list">
        <h2>Доступные объекты недвижимости</h2>
        <ul style={{ margin: 0, padding: 0 }}>
          {properties.map((property) => (
            <li key={property.id} style={{ marginBottom: "10px" }}>
              <div>
                <h3>{property.name}</h3>
                <button onClick={() => this.handlePropertyClick(property)}>
                  View
                </button>
                <button onClick={() => this.deleteProperty(property)}>
                  Delete
                </button>
                <button onClick={() => this.handleEditClick(property)}>Edit</button>
              </div>
            </li>
          ))}
        </ul>
        {isModalOpen && (
          <PropertyInfo property={selectedProperty} closeModal={this.closeModal} />
        )}
        {isEditModalOpen && (
          <PropertyEdit
            property={selectedProperty}
            closeModal={this.closeModal}
            updateProperty={this.updateProperty}
          />
        )}
        <h2>Добавить новый объект недвижимости</h2>
        <PropertyForm addProperty={this.addProperty} />
      </section>
    );
  }
}

export default PropertyList;