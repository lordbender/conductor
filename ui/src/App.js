import React from 'react';
import HomeRoutes from 'views/Home';
import MetadataRoutes from 'views/Metadata';
import WorkflowRoutes from 'views/Workflow';
import BodyWrapper from 'components/BodyWrapper';
import Footer from 'components/Footer';

const App = () => (
  <div className="grid-container">
    <BodyWrapper>
      <HomeRoutes />
      <MetadataRoutes />
      <WorkflowRoutes />
    </BodyWrapper>
  </div>
);

export default App;
