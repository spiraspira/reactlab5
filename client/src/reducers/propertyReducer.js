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
            property.Id == action.payload.Id ? action.payload : property
          )
        };
      case 'DELETE_PROPERTY':
        return {
          ...state,
          properties: state.properties.filter(property =>
            property.Id != action.payload.Id
          )
        };
        case 'SORT_PROPERTIES_BY_NAME_ASC':
            return {
              ...state,
              properties: state.properties.slice().sort((a, b) =>
                a.name.localeCompare(b.name)
              )
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