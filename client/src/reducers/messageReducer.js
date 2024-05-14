const initialState = {
  messages: [],
  error: null
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
          message.Id === action.payload.Id ? action.payload : message
        )
      };
    case 'DELETE_MESSAGE':
      return {
        ...state,
        messages: state.messages.filter(message =>
          message.Id != action.payload.Id
        )
      };
    case 'SORT_MESSAGES_BY_DATE_ASC':
      return {
        ...state,
        messages: [...state.messages].sort((a, b) => new Date(a.date) - new Date(b.date))
      };
    case 'FETCH_MESSAGES_SUCCESS':
      return {
        ...state,
        messages: action.payload,
        error: null
      };
    case 'FETCH_MESSAGES_FAILURE':
      return {
        ...state,
        error: action.payload
      };

    default:
      return state;
  }
};

export default messageReducer;