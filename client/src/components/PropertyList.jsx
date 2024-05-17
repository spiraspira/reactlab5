import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Button, Typography, List, ListItem, ListItemText } from "@material-ui/core";
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
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

import ExcelJS from "exceljs";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

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
  const userRole = localStorage.getItem("role");

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
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProperty(property);
        Swal.fire("Deleted!", "The property has been deleted.", "success");
      }
    });
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

  const handleSavePdf = () => {
    const docDefinition = {
      content: [
        { text: "Available Properties", style: "header" },
        { text: " " },
        properties.properties.map((property) => property.name + ": " + property.description)
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true
        },
        subheader: {
          fontSize: 16,
          bold: true,
          margin: [0, 15, 0, 0]
        }
      }
    };

    const pdfDocGenerator = pdfMake.createPdf(docDefinition);
    pdfDocGenerator.download("properties.pdf");
  };

  const handleSaveExcel = () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Properties");

    worksheet.addRow(["Name", "Description"]);

    properties.properties.forEach((property) => {
      worksheet.addRow([property.name, property.description]);
    });

    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "properties.xlsx";
      a.click();
      URL.revokeObjectURL(url);
    });
  };

  return (
    <section className="property-list">
      <Typography variant="h2">Available Properties</Typography>
      <Button variant="outlined" onClick={handleSortPropertiesByName}>
        Sort by Name (Ascending)
      </Button>
      <Button variant="outlined" onClick={handleSaveJson}>
        Download JSON
      </Button>
      <Button variant="outlined" onClick={handleSaveExcel}>
        Download Excel
      </Button>
      <Button variant="outlined" onClick={handleSavePdf}>
        Download PDF      </Button>
      <List>
        {properties.properties.map((property) => (
          <ListItem key={property.Id} style={{ marginBottom: "10px" }}>
            <ListItemText primary={property.name} />
            {userRole === "admin" && (
              <Button variant="outlined" onClick={() => handleDeleteProperty(property)}>
                Delete
              </Button>
            )}
            <Button variant="outlined" onClick={() => handlePropertyClick(property)}>
              View
            </Button>
            {userRole === "admin" && (
              <Button variant="outlined" onClick={() => handleEditClick(property)}>
                Edit
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
          <Typography variant="h2">Add New Property</Typography>
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