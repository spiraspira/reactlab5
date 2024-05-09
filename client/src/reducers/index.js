// reducers/index.js
import { combineReducers } from 'redux';
import propertyReducer from './propertyReducer';
import testimonialReducer from './testimonialReducer';
import messageReducer from './messageReducer';

const rootReducer = combineReducers({
  properties: propertyReducer,
  testimonials: testimonialReducer,
  messages: messageReducer
});

export default rootReducer;