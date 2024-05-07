import React, { useState } from "react";
import { Button, Typography, List, ListItem, ListItemText } from "@material-ui/core";
import TestimonialInfo from "./TestimonialInfo";
import TestimonialForm from "./TestimonialForm";
import TestimonialEdit from "./TestimonialEdit";
import testimonialsData from "../data/testimonials.json";

const TestimonialList = () => {
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [testimonials, setTestimonials] = useState(testimonialsData);

  const handleTestimonialClick = (testimonial) => {
    setSelectedTestimonial(testimonial);
    setIsModalOpen(true);
  };

  const handleEditClick = (testimonial) => {
    setSelectedTestimonial(testimonial);
    setIsEditModalOpen(true);
  };

  const closeModal = () => {
    setSelectedTestimonial(null);
    setIsModalOpen(false);
    setIsEditModalOpen(false);
  };

  const updateTestimonial = (updatedTestimonial) => {
    setTestimonials((prevTestimonials) =>
      prevTestimonials.map((testimonial) =>
        testimonial.id === updatedTestimonial.id ? updatedTestimonial : testimonial
      )
    );
    setIsEditModalOpen(false);
  };

  const deleteTestimonial = (testimonial) => {
    setTestimonials((prevTestimonials) =>
      prevTestimonials.filter((item) => item.id !== testimonial.id)
    );
  };

  const addTestimonial = (newTestimonial) => {
    setTestimonials((prevTestimonials) => [...prevTestimonials, newTestimonial]);
  };

  const sortTestimonialsByDateAsc = () => {
    setTestimonials([...testimonials].sort((a, b) => new Date(a.date) - new Date(b.date)));
  };

  return (
    <section className="testimonial-list">
      <Typography variant="h2">Отзывы</Typography>
      <Button variant="outlined" onClick={sortTestimonialsByDateAsc}>
        Sort by Date (Ascending)
      </Button>
      <List style={{ margin: 0, padding: 0 }}>
        {testimonials.map((testimonial) => (
          <ListItem key={testimonial.id} style={{ marginBottom: "10px" }}>
            <ListItemText primary={testimonial.name + " " + testimonial.date} />
            <Button onClick={() => handleTestimonialClick(testimonial)}>View</Button>
            <Button onClick={() => deleteTestimonial(testimonial)}>Delete</Button>
            <Button onClick={() => handleEditClick(testimonial)}>Edit</Button>
          </ListItem>
        ))}
      </List>
      {isModalOpen && (
        <TestimonialInfo testimonial={selectedTestimonial} closeModal={closeModal} />
      )}
      {isEditModalOpen && (
        <TestimonialEdit
          testimonial={selectedTestimonial}
          closeModal={closeModal}
          updateTestimonial={updateTestimonial}
        />
      )}
      <Typography variant="h2">Новый отзыв</Typography>
      <TestimonialForm addTestimonial={addTestimonial} />
    </section>
  );
};

export default TestimonialList;