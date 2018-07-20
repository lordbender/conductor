import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import HelpRoutes from 'views/Help';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <HelpRoutes />
      </BrowserRouter>
    );
  }
}

export default App;
