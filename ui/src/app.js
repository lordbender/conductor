import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import routeConfig from './routes';
import workflowApp from './reducers';

const store = createStore(workflowApp, applyMiddleware(thunk));

function updateLocation() {
  store.dispatch({
    type: 'LOCATION_UPDATED',
    location: this.state.location.key
  });
}

render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routeConfig} onUpdate={updateLocation} />
  </Provider>,
  document.getElementById('content')
);
