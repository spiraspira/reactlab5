import React, { Component } from "react";
import { Typography, List, ListItem, ListItemText, Button } from "@material-ui/core";
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

  addProperty = (newProperty) => {
    this.setState((prevState) => ({
      properties: [...prevState.properties, newProperty]
    }));
  };

  render() {
    const { properties } = this.state;
    const { selectedProperty, isModalOpen, isEditModalOpen } = this.state;

    return (
      <section className="property-list">
        <Typography variant="h2">Доступные объекты недвижимости</Typography>
        <List>
          {properties.map((property) => (
            <ListItem key={property.id} sx={{ marginBottom: "10px" }}>
              <ListItemText primary={property.name} />
              <Button variant="outlined" onClick={() => this.handlePropertyClick(property)}>
                View
              </Button>
              <Button variant="outlined" onClick={() => this.deleteProperty(property)}>
                Delete
              </Button>
              <Button variant="outlined" onClick={() => this.handleEditClick(property)}>
                Edit
              </Button>
            </ListItem>
          ))}
        </List>
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
        <Typography variant="h2">Добавить новый объект недвижимости</Typography>
        <PropertyForm addProperty={this.addProperty} />
      </section>
    );
  }
}

export default PropertyList;