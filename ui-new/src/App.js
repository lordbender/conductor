import React from 'react';
import styled from 'styled-components';
import { BrowserRouter } from 'react-router-dom';
import HelpRoutes from 'views/Help';
import WorkflowRoutes from 'views/Workflow';
import AppBar from 'components/AppBar';

const MainContentArea = styled.div`
  padding-left: 50px;
  padding-right: 50px;
  padding-top: 20px;
`;

const App = () => (
  <div>
    <BrowserRouter>
      <AppBar>
        <MainContentArea>
          <HelpRoutes />
          <WorkflowRoutes />
        </MainContentArea>
      </AppBar>
    </BrowserRouter>
  </div>
);

export default App;
