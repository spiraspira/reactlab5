import React, { useState } from "react";
import { connect } from "react-redux";
import { TextField, Button } from "@material-ui/core";
import { addTestimonial } from "../actions/testimonialActions";

const TestimonialForm = ({ addTestimonial }) => {
  const [name, setName] = useState("");
  const [testimonial, setTestimonial] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "name") {
      setName(value);
    } else if (name === "testimonial") {
      setTestimonial(value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newTestimonial = {
      name: name,
      testimonial: testimonial
    };

    addTestimonial(newTestimonial);

    setName("");
    setTestimonial("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <TextField
          label="Name"
          id="name"
          name="name"
          value={name}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <TextField
          label="Description"
          id="testimonial"
          name="testimonial"
          value={testimonial}
          onChange={handleInputChange}
          required
          multiline
          rows={4}
        />
      </div>
      <Button type="submit" variant="contained" color="primary">
        Add Testimonial
      </Button>
    </form>
  );
};

export default connect(null, { addTestimonial })(TestimonialForm);