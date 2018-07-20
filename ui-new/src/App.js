import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import HelpRoutes from 'views/Help';
import WorkflowRoutes from 'views/Workflow';

const App = () => (
  <BrowserRouter>
    <div>
      <HelpRoutes />
      <WorkflowRoutes />
    </div>
  </BrowserRouter>
);

export default App;
