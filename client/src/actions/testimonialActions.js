import axios from 'axios';

// Action types
export const ADD_TESTIMONIAL = 'ADD_TESTIMONIAL';
export const UPDATE_TESTIMONIAL = 'UPDATE_TESTIMONIAL';
export const DELETE_TESTIMONIAL = 'DELETE_TESTIMONIAL';
export const SORT_TESTIMONIALS_BY_DATE_ASC = 'SORT_TESTIMONIALS_BY_DATE_ASC';
export const FETCH_TESTIMONIALS_SUCCESS = 'FETCH_TESTIMONIALS_SUCCESS';
export const FETCH_TESTIMONIALS_FAILURE = 'FETCH_TESTIMONIALS_FAILURE';

// Action creators
export const addTestimonial = (testimonial) => ({
  type: ADD_TESTIMONIAL,
  payload: testimonial
});

export const updateTestimonial = (testimonial) => ({
  type: UPDATE_TESTIMONIAL,
  payload: testimonial
});

export const deleteTestimonial = (testimonial) => ({
  type: DELETE_TESTIMONIAL,
  payload: testimonial
});

export const sortTestimonialsByDateAsc = () => ({
  type: SORT_TESTIMONIALS_BY_DATE_ASC
});

export const fetchTestimonials = () => {
    return async (dispatch) => {
      try {
        const response = await axios.get('http://localhost:5000/testimonials');
        dispatch({
          type: 'FETCH_TESTIMONIALS_SUCCESS',
          payload: response.data
        });
      } catch (error) {
        dispatch({
          type: 'FETCH_TESTIMONIALS_FAILURE',
          payload: error.testimonial
        });
      }
    };
  };