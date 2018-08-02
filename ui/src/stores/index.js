import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
// import workflow from './workflow';
import global from './global';
import metadata from './metadata';

const store = combineReducers({
  // workflow,
  global,
  metadata
});

const composeEnhancers = composeWithDevTools({
  // Specify name here, actionsBlacklist, actionsCreators and other options if needed
});

export default createStore(store, composeEnhancers(applyMiddleware(thunk)));
