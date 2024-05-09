// reducers/propertyReducer.js
const initialState = {
    properties: []
  };
  
  const propertyReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'ADD_PROPERTY':
        return {
          ...state,
          properties: [...state.properties, action.payload]
        };
      case 'UPDATE_PROPERTY':
        return {
          ...state,
          properties: state.properties.map(property =>
            property.id === action.payload.id ? action.payload : property
          )
        };
      case 'DELETE_PROPERTY':
        return {
          ...state,
          properties: state.properties.filter(property =>
            property.id !== action.payload.id
          )
        };
      default:
        return state;
    }
  };
  
  export default propertyReducer;