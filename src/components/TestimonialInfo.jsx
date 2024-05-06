import React from "react";

const TestimonialInfo = ({ testimonial, closeModal }) => {
  return (
    <div className="modal-container">
      <div className="modal-content">
        <h3>{testimonial.name}</h3>
        <p>{testimonial.testimonial}</p>
        <p>{testimonial.date}</p>
        <button className="modal-close" onClick={closeModal}>
          Close
        </button>
      </div>
    </div>
  );
};

export default TestimonialInfo;