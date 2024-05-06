import React, { Component } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from "@material-ui/core";

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
      <Dialog open={true} onClose={closeModal}>
        <DialogTitle>Edit Testimonial</DialogTitle>
        <DialogContent>
          <form onSubmit={this.handleSubmit}>
            <TextField
              label="Name"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
              fullWidth
            />
            <TextField
              label="Description"
              name="testimonial"
              value={this.state.testimonial}
              onChange={this.handleChange}
              fullWidth
              multiline
              rows={4}
            />
            <TextField
              label="Date"
              name="date"
              value={this.state.date}
              onChange={this.handleChange}
              fullWidth
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
  }
}

export default TestimonialEdit;