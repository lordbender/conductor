import React from 'react';
import { Jumbotron } from 'react-bootstrap';

import conductor from 'images/conductor.png';

const Dashboard = () => (
  <Jumbotron className="jumbotron">
    <div className="row">
      <img src={conductor} alt="Conductor" style={{ width: 400 }} />
    </div>
    <div className="row">&nbsp;</div>
  </Jumbotron>
);

export default Dashboard;
