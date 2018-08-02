import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import store from './stores';
import ErrorBoundry from './components/ErrorBoundry';

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
