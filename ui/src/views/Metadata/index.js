import React from 'react';
import { Route } from 'react-router-dom';
import List from './List';

//       { path: 'workflow/metadata', component: WorkflowMetaList },
//       { path: 'workflow/metadata/:name/:version', component: WorkflowMetaDetails },
//       { path: 'workflow/metadata/tasks', component: TasksMetaList },

const MetadataRoutes = () => (
  <div>
    <Route exact path="/workflow/metadata" component={List} />
  </div>
);

export default MetadataRoutes;
