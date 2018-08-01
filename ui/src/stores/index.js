import { combineReducers, createStore } from 'redux';
// import workflow from './workflow';
import global from './global';

const store = combineReducers({
  // workflow,
  global
});

export default createStore(store);
