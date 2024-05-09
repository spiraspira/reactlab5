import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from "@material-ui/core";

const PropertyInfo = ({ property, closeModal }) => {
  return (
    <div className="modal-container">
      <div className="modal-content">
        <h3>{property.name}</h3>
        <p>{property.description}</p>
        <Button onClick={closeModal} variant = "contained" color="primary">
          Close
        </Button>
      </div>
    </div>
  );
};

export default PropertyInfo;