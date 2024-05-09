// reducers/messageReducer.js
const initialState = {
    messages: []
  };
  
  const messageReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'ADD_MESSAGE':
        return {
          ...state,
          messages: [...state.messages, action.payload]
        };
      case 'UPDATE_MESSAGE':
        return {
          ...state,
          messages: state.messages.map(message =>
            message.id === action.payload.id ? action.payload : message
          )
        };
      case 'DELETE_MESSAGE':
        return {
          ...state,
          messages: state.messages.filter(message =>
            message.id !== action.payload.id
          )
        };
      default:
        return state;
    }
  };
  
  export default messageReducer;