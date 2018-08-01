import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
// import workflow from './workflow';
import global from './global';
import metadata from './metadata';

const store = combineReducers({
  // workflow,
  global,
  metadata
});

export default createStore(store, applyMiddleware(thunk));
