import React, { useState } from "react";
import { Typography, List, ListItem, ListItemText, Button } from "@material-ui/core";
import PropertyInfo from "./PropertyInfo";
import PropertyForm from "./PropertyForm";
import PropertyEdit from "./PropertyEdit";
import propertiesData from "../data/properties.json";

const PropertyList = () => {
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [properties, setProperties] = useState(propertiesData);

  const handlePropertyClick = (property) => {
    setSelectedProperty(property);
    setIsModalOpen(true);
  };

  const handleEditClick = (property) => {
    setSelectedProperty(property);
    setIsEditModalOpen(true);
  };

  const closeModal = () => {
    setSelectedProperty(null);
    setIsModalOpen(false);
    setIsEditModalOpen(false);
  };

  const updateProperty = (updatedProperty) => {
    setProperties((prevState) =>
      prevState.map((property) =>
        property.id === updatedProperty.id ? updatedProperty : property
      )
    );
    setIsEditModalOpen(false);
  };

  const deleteProperty = (property) => {
    setProperties((prevState) =>
      prevState.filter((item) => item.id !== property.id)
    );
  };

  const addProperty = (newProperty) => {
    setProperties((prevState) => [...prevState, newProperty]);
  };

  const sortPropertiesByName = () => {
    setProperties([...properties].sort((a, b) => a.name.localeCompare(b.name)));
  };

  return (
    <section className="property-list">
      <Typography variant="h2">Доступные объекты недвижимости</Typography>
      <Button variant="outlined" onClick={sortPropertiesByName}>
        Sort by Name (Ascending)
      </Button>
      <List>
        {properties.map((property) => (
          <ListItem key={property.id} sx={{ marginBottom: "10px" }}>
            <ListItemText primary={property.name} />
            <Button variant="outlined" onClick={() => handlePropertyClick(property)}>
              View
            </Button>
            <Button variant="outlined" onClick={() => deleteProperty(property)}>
              Delete
            </Button>
            <Button variant="outlined" onClick={() => handleEditClick(property)}>
              Edit
            </Button>
          </ListItem>
        ))}
      </List>
      {isModalOpen && <PropertyInfo property={selectedProperty} closeModal={closeModal} />}
      {isEditModalOpen && (
        <PropertyEdit property={selectedProperty} closeModal={closeModal} updateProperty={updateProperty} />
      )}
      <Typography variant="h2">Добавить новый объект недвижимости</Typography>
      <PropertyForm addProperty={addProperty} />
    </section>
  );
};

export default PropertyList;