import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from "@material-ui/core";

const TestimonialInfo = ({ testimonial, closeModal }) => {
  return (
    <Dialog open={true} onClose={closeModal}>
      <DialogTitle>{testimonial.name}</DialogTitle>
      <DialogContent>
        <Typography>{testimonial.testimonial}</Typography>
        <Typography>{new Date(testimonial.date).toLocaleString()}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeModal} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TestimonialInfo;