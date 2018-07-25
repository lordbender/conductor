import React from 'react';
import { Route } from 'react-router';
import List from 'views/Blueprint/List';
import Detail from 'views/Blueprint/Detail';

const WorkflowRoutes = () => (
  <div>
    <Route exact path="/blueprints" component={List} />
    <Route exact path="/blueprints/:workflowType" component={Detail} />
  </div>
);

export default WorkflowRoutes;
