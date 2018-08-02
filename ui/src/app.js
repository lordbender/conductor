import React from 'react';
import HomeRoutes from './views/Home';
import MetadataRoutes from './views/Metadata';
// import Footer from './components/Footer';
import LeftMenu from './components/LeftMenu';

const App = () => (
  <div className="container">
    <div>
      <LeftMenu version="1.0.0" className="col-md-4" />
    </div>
    <div className="col-md-8">
      <HomeRoutes />
      <MetadataRoutes />
    </div>
    {/* <Footer /> */}
  </div>
);

export default App;
