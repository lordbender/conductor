import React from 'react';
import { Route } from 'react-router';
import Dashboard from 'views/Help/Dashboard';
import Help from 'views/Help/Help';

const HelpRoutes = () => (
  <div>
    <Route exact path="/" component={Dashboard} />
    <Route exact path="/" component={Help} />
  </div>
);

export default HelpRoutes;
