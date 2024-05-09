import React, { useState } from "react";
import { connect } from "react-redux";
import { Button, Typography, List, ListItem, ListItemText } from "@material-ui/core";
import TestimonialInfo from "./TestimonialInfo";
import TestimonialForm from "./TestimonialForm";
import TestimonialEdit from "./TestimonialEdit";
import {
  addTestimonial,
  updateTestimonial,
  deleteTestimonial,
  sortTestimonialsByDateAsc
} from "../actions/testimonialActions";

const TestimonialList = ({
  testimonials,
  addTestimonial,
  updateTestimonial,
  deleteTestimonial,
  sortTestimonialsByDateAsc
}) => {
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

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

  const handleAddTestimonial = (testimonial) => {
    addTestimonial(testimonial);
  };

  const handleUpdateTestimonial = (testimonial) => {
    updateTestimonial(testimonial);
  };

  const handleDeleteTestimonial = (testimonial) => {
    deleteTestimonial(testimonial);
  };

  const handleSortTestimonialsByDateAsc = () => {
    sortTestimonialsByDateAsc();
  };

  return (
    <section className="testimonial-list">
      <Typography variant="h2">Отзывы</Typography>
      <Button variant="outlined" onClick={handleSortTestimonialsByDateAsc}>
        Sort by Date (Ascending)
      </Button>
      <List style={{ margin: 0, padding: 0 }}>
        {testimonials.testimonials.map((testimonial) => (
          <ListItem key={testimonial.id} style={{ marginBottom: "10px" }}>
            <ListItemText primary={testimonial.name + " " + testimonial.date} />
            <Button onClick={() => handleTestimonialClick(testimonial)}>View</Button>
            <Button onClick={() => handleDeleteTestimonial(testimonial)}>Delete</Button>
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
          updateTestimonial={handleUpdateTestimonial}
        />
      )}
      <Typography variant="h2">Новый отзыв</Typography>
      <TestimonialForm addTestimonial={handleAddTestimonial} />
    </section>
  );
};

const mapStateToProps = (state) => ({
  testimonials: state.testimonials
});

export default connect(mapStateToProps, {
  addTestimonial,
  updateTestimonial,
  deleteTestimonial,
  sortTestimonialsByDateAsc
})(TestimonialList);