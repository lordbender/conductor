import React from 'react';
import ReactDOM from 'react-dom';
import App from 'App';
import { Provider } from 'react-redux';
import { MuiThemeProvider } from 'material-ui';
import { createMuiTheme } from 'material-ui/styles';
import blue from 'material-ui/colors/blue';
import store from 'stores';

import './index.css';

const theme = createMuiTheme({
  palette: {
    primary: blue
  }
});

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <App />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
);
