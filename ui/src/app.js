import React from 'react';
import HomeRoutes from './views/Home';
// import MetadataRoutes from './views/Metadata';
// import Footer from './components/Footer';
import LeftMenu from './components/LeftMenu';

const App = () => (
  <div style={{ height: '100%' }}>
    <div style={{ height: '100%' }}>
      <LeftMenu version="1.0.0" />
      <div
        className="appMainBody"
        style={{
          width: document.body.clientWidth - 180,
          marginTop: '10px',
          paddingRight: '20px'
        }}
      >
        <div>
          <HomeRoutes />
          {/* <MetadataRoutes /> */}
        </div>
      </div>
    </div>
    {/* <Footer /> */}
  </div>
);

export default App;
