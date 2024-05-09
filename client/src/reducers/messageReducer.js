import messagesData from "../data/messages.json";

const initialState = {
  messages: messagesData
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
    case 'SORT_MESSAGES_BY_DATE_ASC':
      return {
        ...state,
        messages: [...state.messages].sort((a, b) => new Date(a.date) - new Date(b.date))
      };
    default:
      return state;
  }
};

export default messageReducer;