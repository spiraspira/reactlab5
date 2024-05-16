import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Button, Typography, List, ListItem, ListItemText } from "@material-ui/core";
import PropertyInfo from "./PropertyInfo";
import PropertyForm from "./PropertyForm";
import PropertyEdit from "./PropertyEdit";
import {
  addProperty,
  updateProperty,
  deleteProperty,
  sortPropertiesByNameAsc,
  fetchProperties
} from "../actions/propertyActions";

const PropertyList = ({
  properties,
  addProperty,
  updateProperty,
  deleteProperty,
  sortPropertiesByNameAsc,
  fetchProperties
}) => {
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const userRole = localStorage.getItem("role"); // Get user role from localStorage

  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

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

  const handleAddProperty = (property) => {
    addProperty(property);
  };

  const handleUpdateProperty = (property) => {
    updateProperty(property);
  };

  const handleDeleteProperty = (property) => {
    deleteProperty(property);
  };

  const handleSortPropertiesByName = () => {
    sortPropertiesByNameAsc();
  };

  const handleSaveJson = () => {
    const json = JSON.stringify(properties);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "properties.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section className="property-list">
      <Typography variant="h2">Доступные объекты недвижимости</Typography>
      <Button variant="outlined" onClick={handleSortPropertiesByName}>
        Сортировать по названию (по возрастанию)
      </Button>
      <Button variant="outlined" onClick={handleSaveJson}>
        Сохранить JSON
      </Button>
      <List>
        {properties.properties.map((property) => (
          <ListItem key={property.Id} style={{ marginBottom: "10px" }}>
            <ListItemText primary={property.name} />
            {userRole === "admin" && (
              <Button variant="outlined" onClick={() => handleDeleteProperty(property)}>
                Удалить
              </Button>
            )}
            <Button variant="outlined" onClick={() => handlePropertyClick(property)}>
              Просмотр
            </Button>
            {userRole === "admin" && (
              <Button variant="outlined" onClick={() => handleEditClick(property)}>
                Редактировать
              </Button>
            )}
          </ListItem>
        ))}
      </List>
      {isModalOpen && <PropertyInfo property={selectedProperty} closeModal={closeModal} />}
      {isEditModalOpen && (
        <PropertyEdit
          property={selectedProperty}
          closeModal={closeModal}
          updateProperty={handleUpdateProperty}
        />
      )}
      {userRole === "admin" && (
        <>
          <Typography variant="h2">Добавить новый объект недвижимости</Typography>
          <PropertyForm addProperty={handleAddProperty} />
        </>
      )}
    </section>
  );
};

const mapStateToProps = (state) => ({
  properties: state.properties
});

export default connect(mapStateToProps, {
  addProperty,
  updateProperty,
  deleteProperty,
  sortPropertiesByNameAsc,
  fetchProperties
})(PropertyList);