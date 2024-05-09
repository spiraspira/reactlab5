import axios from 'axios';

// Action types
export const ADD_MESSAGE = 'ADD_MESSAGE';
export const UPDATE_MESSAGE = 'UPDATE_MESSAGE';
export const DELETE_MESSAGE = 'DELETE_MESSAGE';
export const SORT_MESSAGES_BY_DATE_ASC = 'SORT_MESSAGES_BY_DATE_ASC';
export const FETCH_MESSAGES_SUCCESS = 'FETCH_MESSAGES_SUCCESS';
export const FETCH_MESSAGES_FAILURE = 'FETCH_MESSAGES_FAILURE';

// Action creators
export const addMessage = (message) => ({
  type: ADD_MESSAGE,
  payload: message
});

export const updateMessage = (message) => ({
  type: UPDATE_MESSAGE,
  payload: message
});

export const deleteMessage = (message) => ({
  type: DELETE_MESSAGE,
  payload: message
});

export const sortMessagesByDateAsc = () => ({
  type: SORT_MESSAGES_BY_DATE_ASC
});

export const fetchMessages = () => {
    return async (dispatch) => {
      try {
        const response = await axios.get('http://localhost:5000/messages');
        dispatch({
          type: 'FETCH_MESSAGES_SUCCESS',
          payload: response.data
        });
      } catch (error) {
        dispatch({
          type: 'FETCH_MESSAGES_FAILURE',
          payload: error.message
        });
      }
    };
  };