/* eslint-disable */

import React, { Component } from 'react';
import uuid from 'uuid';

class Grapher extends Component {
  constructor() {
    super();
    const flowId = uuid.v4();

    this.state = { flowId, flowKey: `flow-chart-${flowId}` };
  }

  componentDidMount() {
    const { flowKey } = this.state;
    const node = document.getElementById(flowKey);
  }

  render() {
    const { flowKey } = this.state;

    return <div id={flowKey} />;
  }
}

export default Grapher;
