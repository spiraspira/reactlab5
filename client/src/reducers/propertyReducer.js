import axios from 'axios';

const initialState = {
  properties: []
};

const propertyReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_PROPERTIES':
      return {
        ...state,
        properties: action.payload
      };
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
    case 'SORT_PROPERTIES_BY_PRICE_ASC':
      return {
        ...state,
        properties: [...state.properties].sort((a, b) => a.price - b.price)
      };
    default:
      return state;
  }
};

// Асинхронное действие для получения данных о недвижимости с сервера
export const fetchProperties = () => {
  return async dispatch => {
    try {
      const response = await axios.get('/properties'); // Замените URL на ваш сервер
      dispatch({ type: 'SET_PROPERTIES', payload: response.data });
    } catch (error) {
      console.error('Ошибка при получении данных о недвижимости:', error);
    }
  };
};

export default propertyReducer;