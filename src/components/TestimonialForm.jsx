import React, { Component } from "react";
import { TextField, Button } from "@material-ui/core";

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
          <TextField
            label="Name"
            id="name"
            name="name"
            value={name}
            onChange={this.handleInputChange}
            required
          />
        </div>
        <div>
          <TextField
            label="Description"
            id="testimonial"
            name="testimonial"
            value={testimonial}
            onChange={this.handleInputChange}
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
            onChange={this.handleInputChange}
            required
          />
        </div>
        <Button type="submit" variant="contained" color="primary">
          Add Testimonial
        </Button>
      </form>
    );
  }
}

export default TestimonialForm;