import React, { useState } from "react";
import { TextField, Button } from "@material-ui/core";

const TestimonialForm = ({ addTestimonial }) => {
  const [name, setName] = useState("");
  const [testimonial, setTestimonial] = useState("");
  const [date, setDate] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "name") {
      setName(value);
    } else if (name === "testimonial") {
      setTestimonial(value);
    } else if (name === "date") {
      setDate(value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newTestimonial = {
      id: Date.now(),
      name: name,
      testimonial: testimonial,
      date: date
    };

    addTestimonial(newTestimonial);

    setName("");
    setTestimonial("");
    setDate("");
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
      <div>
        <TextField
          label="Date"
          id="date"
          name="date"
          value={date}
          onChange={handleInputChange}
          required
        />
      </div>
      <Button type="submit" variant="contained" color="primary">
        Add Testimonial
      </Button>
    </form>
  );
};

export default TestimonialForm;