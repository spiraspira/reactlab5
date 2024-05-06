import React, { useEffect, useState } from "react";
import TestimonialList from "../components/TestimonialList";
import testimonialsData from "../data/testimonials.json";

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    setTestimonials(testimonialsData);
  }, []);

  return <TestimonialList Testimonials={testimonials} />;
};

export default Testimonials;