import React from 'react';
import { Route } from 'react-router-dom';
import List from './List';
import Detail from './Detail';

//       { path: 'workflow/metadata', component: WorkflowMetaList },
//       { path: 'workflow/metadata/:name/:version', component: WorkflowMetaDetails },
//       { path: 'workflow/metadata/tasks', component: TasksMetaList },

const MetadataRoutes = () => (
  <div>
    <Route exact path="/metadata" component={List} />
    <Route exact path="/metadata/:name/:version" component={Detail} />
  </div>
);

export default MetadataRoutes;
