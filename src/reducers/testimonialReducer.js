// reducers/testimonialReducer.js
const initialState = {
    testimonials: []
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
      default:
        return state;
    }
  };
  
  export default testimonialReducer;