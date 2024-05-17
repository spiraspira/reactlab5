import axios from 'axios';

// Create an axios instance with default headers
const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000',
    headers: {
      // Add other default headers if needed
    },
  });
  
  // Add an interceptor to set the Authorization header with the token
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = token;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

// Action types
export const ADD_TESTIMONIAL = 'ADD_TESTIMONIAL';
export const UPDATE_TESTIMONIAL = 'UPDATE_TESTIMONIAL';
export const DELETE_TESTIMONIAL = 'DELETE_TESTIMONIAL';
export const SORT_TESTIMONIALS_BY_DATE_ASC = 'SORT_TESTIMONIALS_BY_DATE_ASC';
export const FETCH_TESTIMONIALS_SUCCESS = 'FETCH_TESTIMONIALS_SUCCESS';
export const FETCH_TESTIMONIALS_FAILURE = 'FETCH_TESTIMONIALS_FAILURE';

// Action creators
export const addTestimonial = (testimonial) => {
  return async (dispatch) => {
    try {
      const response = await axiosInstance.post('http://localhost:5000/testimonials', testimonial);
      dispatch({
        type: ADD_TESTIMONIAL,
        payload: response.data
      });
    } catch (error) {
      console.error(error);
    }
  };
};

export const updateTestimonial = (testimonial) => {
  return async (dispatch) => {
    try {
      const response = await axiosInstance.put(`http://localhost:5000/testimonials/${testimonial.Id}`, testimonial);
      dispatch({
        type: UPDATE_TESTIMONIAL,
        payload: response.data
      });
    } catch (error) {
      console.error(error);
    }
  };
};

export const deleteTestimonial = (testimonial) => {
  return async (dispatch) => {
    try {
      const response = await axiosInstance.delete(`http://localhost:5000/testimonials/${testimonial.Id}`);

      dispatch({
        type: DELETE_TESTIMONIAL,
        payload: response.data
      });
    } catch (error) {
      console.error(error);
    }
  };
};

export const sortTestimonialsByDateAsc = () => ({
  type: SORT_TESTIMONIALS_BY_DATE_ASC
});

export const fetchTestimonials = () => {
  return async (dispatch) => {
    try {
      const response = await axiosInstance.get('http://localhost:5000/testimonials');
      dispatch({
        type: FETCH_TESTIMONIALS_SUCCESS,
        payload: response.data
      });
    } catch (error) {
      dispatch({
        type: FETCH_TESTIMONIALS_FAILURE,
        payload: error.message
      });
    }
  };
};