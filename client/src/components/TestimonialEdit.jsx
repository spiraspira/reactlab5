import React, { useState } from "react";
import { connect } from "react-redux";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField
} from "@material-ui/core";
import { updateTestimonial } from "../actions/testimonialActions";

const TestimonialEdit = ({ testimonial, closeModal, updateTestimonial }) => {
  const [name, setName] = useState(testimonial.name);
  const [testimonialText, setTestimonialText] = useState(testimonial.testimonial);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "name") {
      setName(value);
    } else if (name === "testimonial") {
      setTestimonialText(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedTestimonial = {
      ...testimonial,
      name: name,
      testimonial: testimonialText
    };

    console.log(updatedTestimonial);

    updateTestimonial(updatedTestimonial);
  };

  return (
    <Dialog open={true} onClose={closeModal}>
      <DialogTitle>Edit Testimonial</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            name="name"
            value={name}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Description"
            name="testimonial"
            value={testimonialText}
            onChange={handleChange}
            fullWidth
            multiline
            rows={4}
          />
          <DialogActions>
            <Button type="submit" color="primary">
              Save
            </Button>
            <Button onClick={closeModal} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default connect(null, { updateTestimonial })(TestimonialEdit);