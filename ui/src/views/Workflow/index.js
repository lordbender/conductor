import React from 'react';
import { Route } from 'react-router-dom';
import List from 'views/Workflow/List';
import Detail from 'views/Workflow/Detail';

// import WorkflowMetaList from './components/workflow/WorkflowMetaList';

//       { path: 'workflow/queue/data', component: QueueList },
//       { path: 'workflow', component: Workflow },
//       { path: 'workflow/id/:workflowId', component: WorkflowDetails },

const WorkflowRoutes = () => (
  <div>
    <Route exact path="/workflow" component={List} />
    <Route exact path="/workflow/:workflowId" component={Detail} />
  </div>
);

export default WorkflowRoutes;
