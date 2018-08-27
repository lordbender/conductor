import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import RoutesIndex from 'views/RoutesIndex';
import workflowApp from 'reducers';

// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(workflowApp, composeEnhancers(applyMiddleware(thunkMiddleware)));

// function updateLocation() {
//   store.dispatch({
//     type: 'LOCATION_UPDATED',
//     location: this.state.location.key
//   });
// }

const App = () => (
  <Provider store={store}>
    <Router>
      <RoutesIndex />
    </Router>
  </Provider>
);

export default App;
