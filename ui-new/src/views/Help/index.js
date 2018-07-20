import React from 'react';
import { Route } from 'react-router';
import Dashboard from 'views/Help/Dashboard';

const HelpRoutes = () => (
  <div>
    <Route exact path="/" component={Dashboard} />
  </div>
);

export default HelpRoutes;
