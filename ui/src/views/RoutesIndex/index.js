import React from 'react';
import { Route } from 'react-router-dom';

import WorkflowList from 'components/workflow/executions/WorkflowList';
import Event from 'components/event/EventList';
import EventExecs from 'components/event/EventExecs';
import WorkflowDetails from 'components/workflow/executions/WorkflowDetails';
import WorkflowMetaList from 'components/workflow/WorkflowMetaList';
import TasksMetaList from 'components/workflow/tasks/TasksMetaList';
import QueueList from 'components/workflow/queues/QueueList';
import WorkflowMetaDetails from 'components/workflow/WorkflowMetaDetails';
import Intro from 'components/common/Home';
import Help from 'components/common/Help';

const RoutesIndex = () => (
  <div>
    <Route exact path="/" component={Intro} />
    <Route exact path="/workflow/metadata" component={WorkflowMetaList} />
    <Route exact path="/workflow/metadata/:name/:version" component={WorkflowMetaDetails} />
    <Route exact path="/workflow/metadata/tasks" component={TasksMetaList} />
    <Route exact path="/workflow/queue/data" component={QueueList} />
    <Route exact path="/workflow" component={WorkflowList} />
    <Route exact path="/workflow/id/:workflowId" component={WorkflowDetails} />
    <Route exact path="/events" component={Event} />
    <Route exact path="/events/executions" component={EventExecs} />
    <Route exact path="/help" component={Help} />
  </div>
);

export default RoutesIndex;
