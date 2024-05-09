import propertiesData from "../data/properties.json";

const initialState = {
  properties: propertiesData
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
    case 'SORT_PROPERTIES_BY_NAME_ASC':
      return {
        ...state,
        properties: state.properties.slice().sort((a, b) =>
          a.name.localeCompare(b.name)
        )
      };
    default:
      return state;
  }
};

export default propertyReducer;