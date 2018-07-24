import React from 'react';
import styled from 'styled-components';
import { BrowserRouter } from 'react-router-dom';
import HelpRoutes from 'views/Help';
import WorkflowRoutes from 'views/Workflow';
import TaskRoutes from 'views/Tasks';
import AppWrapper from 'components/AppWrapper';

const MainContentArea = styled.div`
  padding-left: 50px;
  padding-right: 50px;
  padding-top: 20px;
`;

const App = () => (
  <div>
    <BrowserRouter>
      <AppWrapper>
        <MainContentArea>
          <HelpRoutes />
          <WorkflowRoutes />
          <TaskRoutes />
        </MainContentArea>
      </AppWrapper>
    </BrowserRouter>
  </div>
);

export default App;
