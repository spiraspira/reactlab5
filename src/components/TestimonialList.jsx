import React, { Component } from "react";
import { Button, Typography, List, ListItem, ListItemText } from "@material-ui/core";
import TestimonialInfo from "./TestimonialInfo";
import TestimonialForm from "./TestimonialForm";
import TestimonialEdit from "./TestimonialEdit";
import testimonialsData from "../data/testimonials.json";

class TestimonialList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTestimonial: null,
      isModalOpen: false,
      isEditModalOpen: false,
      testimonials: testimonialsData
    };
  }

  handleTestimonialClick = (testimonial) => {
    this.setState({
      selectedTestimonial: testimonial,
      isModalOpen: true
    });
  };

  handleEditClick = (testimonial) => {
    this.setState({
      selectedTestimonial: testimonial,
      isEditModalOpen: true
    });
  };

  closeModal = () => {
    this.setState({
      selectedTestimonial: null,
      isModalOpen: false,
      isEditModalOpen: false
    });
  };

  updateTestimonial = (updatedTestimonial) => {
    // Update the testimonial in the state
    this.setState((prevState) => ({
      testimonials: prevState.testimonials.map((testimonial) =>
        testimonial.id === updatedTestimonial.id ? updatedTestimonial : testimonial
      ),
      isEditModalOpen: false
    }));
  };

  deleteTestimonial = (testimonial) => {
    this.setState((prevState) => ({
      testimonials: prevState.testimonials.filter((item) => item.id !== testimonial.id)
    }));
  };

  addTestimonial = (newTestimonial) => {
    this.setState((prevState) => ({
      testimonials: [...prevState.testimonials, newTestimonial]
    }));
  };

  render() {
    const { testimonials } = this.state;
    const { selectedTestimonial, isModalOpen, isEditModalOpen } = this.state;

    return (
      <section className="testimonial-list">
        <Typography variant="h2">Отзывы</Typography>
        <List style={{ margin: 0, padding: 0 }}>
          {testimonials.map((testimonial) => (
            <ListItem key={testimonial.id} style={{ marginBottom: "10px" }}>
              <ListItemText primary={testimonial.name + " " + testimonial.date} />
              <Button onClick={() => this.handleTestimonialClick(testimonial)}>
                View
              </Button>
              <Button onClick={() => this.deleteTestimonial(testimonial)}>
                Delete
              </Button>
              <Button onClick={() => this.handleEditClick(testimonial)}>Edit</Button>
            </ListItem>
          ))}
        </List>
        {isModalOpen && (
          <TestimonialInfo testimonial={selectedTestimonial} closeModal={this.closeModal} />
        )}
        {isEditModalOpen && (
          <TestimonialEdit
            testimonial={selectedTestimonial}
            closeModal={this.closeModal}
            updateTestimonial={this.updateTestimonial}
          />
        )}
        <Typography variant="h2">Новый отзыв</Typography>
        <TestimonialForm addTestimonial={this.addTestimonial} />
      </section>
    );
  }
}

export default TestimonialList;