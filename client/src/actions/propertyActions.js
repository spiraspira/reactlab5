import axios from 'axios';

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
      const response = await axios.post('http://localhost:5000/properties', property);
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
      const response = await axios.put(`http://localhost:5000/properties/${property.id}`, property);
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
      const response = await axios.delete(`http://localhost:5000/properties/${property.id}`);
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
      const response = await axios.get('http://localhost:5000/properties');
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