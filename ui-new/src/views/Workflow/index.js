import React from 'react';
import { Route } from 'react-router';
import List from 'views/Workflow/List';

const WorkflowRoutes = () => (
  <div>
    <Route exact path="/workflows" component={List} />
  </div>
);

export default WorkflowRoutes;
