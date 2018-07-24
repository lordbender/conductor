import React from 'react';
import { Route } from 'react-router';
import List from 'views/Tasks/List';

const TasksRoutes = () => (
  <div>
    <Route exact path="/tasks" component={List} />
  </div>
);

export default TasksRoutes;
