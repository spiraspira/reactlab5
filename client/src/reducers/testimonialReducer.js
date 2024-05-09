import axios from 'axios';

const initialState = {
  testimonials: []
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
        testimonials: [...state.testimonials].sort((a, b) => new Date(a.date) - new Date(b.date))
      };
    default:
      return state;
  }
};

// Асинхронное действие для получения данных с сервера
export const fetchTestimonials = () => {
  return async dispatch => {
    try {
      const response = await axios.get('/testimonials'); // Замените URL на ваш сервер
      dispatch({ type: 'SET_TESTIMONIALS', payload: response.data });
    } catch (error) {
      console.error('Ошибка при получении данных с сервера:', error);
    }
  };
};

export default testimonialReducer;