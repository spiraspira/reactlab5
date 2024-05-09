// Action types
export const ADD_PROPERTY = 'ADD_PROPERTY';
export const UPDATE_PROPERTY = 'UPDATE_PROPERTY';
export const DELETE_PROPERTY = 'DELETE_PROPERTY';
export const SORT_PROPERTIES_BY_NAME_ASC = 'SORT_PROPERTIES_BY_NAME_ASC';

// Action creators
export const addProperty = (property) => ({
  type: ADD_PROPERTY,
  payload: property
});

export const updateProperty = (property) => ({
  type: UPDATE_PROPERTY,
  payload: property
});

export const deleteProperty = (property) => ({
  type: DELETE_PROPERTY,
  payload: property
});

export const sortPropertiesByNameAsc = () => ({
  type: SORT_PROPERTIES_BY_NAME_ASC
});