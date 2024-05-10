const initialState = {
  testimonials: [],
  error: null
};

const testimonialReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_TESTIMONIALS':
      return {
        ...state,
        testimonials: action.payload
      };
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
          testimonials: [...state.testimonials].sort((a, b) => {
            return new Date(a.date) - new Date(b.date);
          })
        };
      case 'FETCH_TESTIMONIALS_SUCCESS':
        return {
          ...state,
          testimonials: action.payload,
          error: null
        };
      case 'FETCH_TESTIMONIALS_FAILURE':
        return {
          ...state,
          error: action.payload
        };
    default:
      return state;
  }
};

export default testimonialReducer;