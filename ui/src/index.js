import React from 'react';
import store from 'stores';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import ErrorBoundry from 'components/ErrorBoundry';
import App from 'App';

import './index.css';

const Wrapper = () => (
  <ErrorBoundry>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </ErrorBoundry>
);

ReactDOM.render(<Wrapper />, document.getElementById('root'));
