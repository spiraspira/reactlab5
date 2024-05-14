import axios from 'axios';

// Action types
export const ADD_MESSAGE = 'ADD_MESSAGE';
export const UPDATE_MESSAGE = 'UPDATE_MESSAGE';
export const DELETE_MESSAGE = 'DELETE_MESSAGE';
export const SORT_MESSAGES_BY_DATE_ASC = 'SORT_MESSAGES_BY_DATE_ASC';
export const FETCH_MESSAGES_SUCCESS = 'FETCH_MESSAGES_SUCCESS';
export const FETCH_MESSAGES_FAILURE = 'FETCH_MESSAGES_FAILURE';

// Action creators
export const addMessage = (message) => {
  return async (dispatch) => {
    try {
      const response = await axios.post('http://localhost:5000/messages', message);
      dispatch({
        type: ADD_MESSAGE,
        payload: response.data
      });
    } catch (error) {
      console.error(error);
    }
  };
};

export const updateMessage = (message) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(`http://localhost:5000/messages/${message.Id}`, message);
      dispatch({
        type: UPDATE_MESSAGE,
        payload: response.data
      });
    } catch (error) {
      console.error(error);
    }
  };
};

export const deleteMessage = (message) => {
  return async (dispatch) => {
    try {
      const response = await axios.delete(`http://localhost:5000/messages/${message.Id}`);
      dispatch({
        type: DELETE_MESSAGE,
        payload: response.data
      });
    } catch (error) {
      console.error(error);
    }
  };
};

export const sortMessagesByDateAsc = () => ({
  type: SORT_MESSAGES_BY_DATE_ASC
});

export const fetchMessages = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get('http://localhost:5000/messages');
      dispatch({
        type: FETCH_MESSAGES_SUCCESS,
        payload: response.data
      });
    } catch (error) {
      dispatch({
        type: FETCH_MESSAGES_FAILURE,
        payload: error.message
      });
    }
  };
};