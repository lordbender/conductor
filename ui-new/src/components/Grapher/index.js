/* eslint-disable */

import React, { Component } from 'react';
import uuid from 'uuid';
import svg from 'svg.js';

class Grapher extends Component {
  constructor() {
    super();
    const flowId = uuid.v4();

    this.state = { flowId, flowKey: `flow-chart-${flowId}` };
  }

  componentDidMount() {
    const { flowKey } = this.state;
    const node = document.getElementById(flowKey);
    var draw = svg(flowKey).size(300, 300);
    var rect = draw.rect(100, 100).attr({ fill: '#f06' });
  }

  render() {
    const { flowKey } = this.state;

    return <div id={flowKey} />;
  }
}

export default Grapher;
