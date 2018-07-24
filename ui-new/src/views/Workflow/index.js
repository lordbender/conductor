import React from 'react';
import { Route } from 'react-router';
import List from 'views/Workflow/List';
import Detail from 'views/Workflow/Detail';

const WorkflowRoutes = () => (
  <div>
    <Route exact path="/workflows" component={List} />
    <Route exact path="/workflows/:workflowId" component={Detail} />
  </div>
);

export default WorkflowRoutes;
