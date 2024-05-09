const initialState = {
    properties: [],
    error: null
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
      case 'SORT_PROPERTIES_BY_DATE_ASC':
        return {
          ...state,
          properties: [...state.properties].sort((a, b) => new Date(a.date) - new Date(b.date))
        };
      case 'FETCH_PROPERTIES_SUCCESS':
        return {
          ...state,
          properties: action.payload,
          error: null
        };
      case 'FETCH_PROPERTIES_FAILURE':
        return {
          ...state,
          error: action.payload
        };
      default:
        return state;
    }
  };
  
  export default propertyReducer;