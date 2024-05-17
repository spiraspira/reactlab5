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
export const ADD_PROPERTY = 'ADD_PROPERTY';
export const UPDATE_PROPERTY = 'UPDATE_PROPERTY';
export const DELETE_PROPERTY = 'DELETE_PROPERTY';
export const SORT_PROPERTIES_BY_NAME_ASC = 'SORT_PROPERTIES_BY_NAME_ASC';
export const FETCH_PROPERTIES_SUCCESS = 'FETCH_PROPERTIES_SUCCESS';
export const FETCH_PROPERTIES_FAILURE = 'FETCH_PROPERTIES_FAILURE';

// Action creators
export const addProperty = (property) => {
  return async (dispatch) => {
    try {
      const response = await axiosInstance.post('http://localhost:5000/properties', property);
      dispatch({
        type: ADD_PROPERTY,
        payload: response.data
      });
    } catch (error) {
      console.error(error);
    }
  };
};

export const updateProperty = (property) => {
  return async (dispatch) => {
    try {
      const response = await axiosInstance.put(`http://localhost:5000/properties/${property.Id}`, property);
      dispatch({
        type: UPDATE_PROPERTY,
        payload: response.data
      });
    } catch (error) {
      console.error(error);
    }
  };
};

export const deleteProperty = (property) => {
  return async (dispatch) => {
    try {
      const response = await axiosInstance.delete(`http://localhost:5000/properties/${property.Id}`);
      dispatch({
        type: DELETE_PROPERTY,
        payload: response.data
      });
    } catch (error) {
      console.error(error);
    }
  };
};

export const sortPropertiesByNameAsc = () => ({
  type: SORT_PROPERTIES_BY_NAME_ASC
});

export const fetchProperties = () => {
  return async (dispatch) => {
    try {
      const response = await axiosInstance.get('http://localhost:5000/properties');
      dispatch({
        type: FETCH_PROPERTIES_SUCCESS,
        payload: response.data
      });
    } catch (error) {
      dispatch({
        type: FETCH_PROPERTIES_FAILURE,
        payload: error.message
      });
    }
  };
};