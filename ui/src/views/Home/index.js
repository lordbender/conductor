import React from 'react';
import { Route } from 'react-router-dom';
import Dashboard from './Dashboard';

const HomeRoutes = () => (
  <div>
    <Route exact path="/" component={Dashboard} />
  </div>
);

export default HomeRoutes;
