import React from 'react';
import styled from 'styled-components';
import HomeRoutes from './views/Home';
import MetadataRoutes from './views/Metadata';
// import Footer from './components/Footer';
import LeftMenu from './components/LeftMenu';

const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

const Column = styled.div`
  width: ${props => props.width || '100%'};
  flex-direction: row;
  padding: ${props => props.padding || 0}px;
`;

const App = () => (
  <Container>
    <Column width="20%" padding={5}>
      <LeftMenu version="1.0.0" />
    </Column>
    <Column width="80%" padding={15}>
      <HomeRoutes />
      <MetadataRoutes />
    </Column>
    {/* <Footer /> */}
  </Container>
);

export default App;
