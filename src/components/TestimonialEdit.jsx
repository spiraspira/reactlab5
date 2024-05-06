import React, { Component } from "react";

class TestimonialEdit extends Component {
    constructor(props) {
        super(props);
      
        this.state = {
          name: props.testimonial.name,
          testimonial: props.testimonial.testimonial,
          date: props.testimonial.date
        };
      }

      handleChange = (e) => {
        this.setState({
          [e.target.name]: e.target.value
        });
      };

  handleSubmit = (e) => {
    e.preventDefault();

    const updatedTestimonial = {
        ...this.props.testimonial,
        name: this.state.name,
        testimonial: this.state.testimonial,
        date: this.state.date
      };

    this.props.updateTestimonial(updatedTestimonial);
  };

  render() {
    const { testimonial, closeModal } = this.props;

    return (
      <div className="modal-container">
        <div className="modal-content">
          <h2>Edit Testimonial</h2>
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
            />
            <label htmlFor="testimonial">Description:</label>
            <textarea
             name="testimonial"
            value={this.state.testimonial}
            onChange={this.handleChange}
            />
            <label htmlFor="date">Date:</label>
            <input
              type="text"
              name="date"
              value={this.state.date}
              onChange={this.handleChange}
            />
            <div className="modal-buttons">
              <button type="submit">Save</button>
              <button onClick={closeModal}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default TestimonialEdit;