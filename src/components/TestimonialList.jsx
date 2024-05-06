import React, { Component } from "react";
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
        <h2>Отзывы</h2>
        <ul style={{ margin: 0, padding: 0 }}>
          {testimonials.map((testimonial) => (
            <li key={testimonial.id} style={{ marginBottom: "10px" }}>
              <div>
                <h3>{testimonial.name + " " + testimonial.date}</h3>
                <button onClick={() => this.handleTestimonialClick(testimonial)}>
                  View
                </button>
                <button onClick={() => this.deleteTestimonial(testimonial)}>
                  Delete
                </button>
                <button onClick={() => this.handleEditClick(testimonial)}>Edit</button>
              </div>
            </li>
          ))}
        </ul>
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
        <h2>Новый отзыв</h2>
        <TestimonialForm addTestimonial={this.addTestimonial} />
      </section>
    );
  }
}

export default TestimonialList;