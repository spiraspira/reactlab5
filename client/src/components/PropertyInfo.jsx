import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from "@material-ui/core";

const PropertyInfo = ({ property, closeModal }) => {
  return (
    <Dialog open={true} onClose={closeModal}>
      <DialogTitle>{property.name}</DialogTitle>
      <DialogContent>
        <Typography>{property.description}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeModal} color="primary">
          Закрыть
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PropertyInfo;