import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';

import global from './global';
import workflow from './workflow';
import blueprints from './metadata';
import tasks from './tasks';

const rootReducer = combineReducers({
  global,
  workflow,
  blueprints,
  tasks,
  routing: routerReducer
});

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

export default store;

export const history = syncHistoryWithStore(createHistory(), store);
