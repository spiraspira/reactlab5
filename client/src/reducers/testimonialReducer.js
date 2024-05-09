import testimonialsData from "../data/testimonials.json";

const initialState = {
  testimonials: testimonialsData
};

const testimonialReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TESTIMONIAL':
      return {
        ...state,
        testimonials: [...state.testimonials, action.payload]
      };
    case 'UPDATE_TESTIMONIAL':
      return {
        ...state,
        testimonials: state.testimonials.map(testimonial =>
          testimonial.id === action.payload.id ? action.payload : testimonial
        )
      };
    case 'DELETE_TESTIMONIAL':
      return {
        ...state,
        testimonials: state.testimonials.filter(testimonial =>
          testimonial.id !== action.payload.id
        )
      };
    case 'SORT_TESTIMONIALS_BY_DATE_ASC':
      return {
        ...state,
        testimonials: [...state.testimonials].sort((a, b) => new Date(a.date) - new Date(b.date))
      };
    default:
      return state;
  }
};

export default testimonialReducer;