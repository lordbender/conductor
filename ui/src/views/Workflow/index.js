import React from 'react';
import { Route } from 'react-router-dom';
import Dashboard from './Dashboard';

import WorkflowMetaList from './components/workflow/WorkflowMetaList';

//       { path: 'workflow/queue/data', component: QueueList },
//       { path: 'workflow', component: Workflow },
//       { path: 'workflow/id/:workflowId', component: WorkflowDetails },
const WorkflowRoutes = () => (
  <div>
    <Route exact path="/" component={Dashboard} />
  </div>
);

export default WorkflowRoutes;
