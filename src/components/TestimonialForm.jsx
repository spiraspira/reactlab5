import React, { Component } from "react";

class TestimonialForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      testimonial: "",
      date: ""
    };
  }

  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { name, testimonial, date } = this.state;

    // Create a new testimonial object
    const newTestimonial = {
      id: Date.now(),
      name,
      testimonial,
      date
    };

    // Call the addTestimonial function passed in props
    this.props.addTestimonial(newTestimonial);

    // Clear the form inputs
    this.setState({
      name: "",
      testimonial: "",
      date: ""
    });
  };

  render() {
    const { name, testimonial, date } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={this.handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="testimonial">Description:</label>
          <textarea
            id="testimonial"
            name="testimonial"
            value={testimonial}
            onChange={this.handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="date">Date:</label>
          <input
            type="text"
            id="date"
            name="date"
            value={date}
            onChange={this.handleInputChange}
            required
          />
        </div>
        <button type="submit">Add Testimonial</button>
      </form>
    );
  }
}

export default TestimonialForm;