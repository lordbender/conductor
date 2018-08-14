import React from 'react';
import { Switch } from 'react-router-dom';
import styled from 'styled-components';
import HomeRoutes from 'views/Home';
import MetadataRoutes from 'views/Metadata';
import WorkflowRoutes from 'views/Workflow';
import LeftMenu from 'components/LeftMenu';
import Footer from 'components/Footer';

const App = () => (
  <div className="grid-container">
    <div className="grid-item header">Header</div>
    <div className="grid-item side-nav">
      <LeftMenu version="1.0.0" />
    </div>
    <div className="grid-item body">
      <HomeRoutes />
      <MetadataRoutes />
      <WorkflowRoutes />
    </div>
    <div className="grid-item footer">
      <Footer />
    </div>
  </div>
);

export default App;
