/* eslint-disable */

import React, { Component } from 'react';
import * as go from 'gojs';
import uuid from 'uuid';

class Grapher extends Component {
  constructor() {
    super();
    const flowId = uuid.v4();

    this.state = { flowId, flowKey: `flow-chart-${flowId}` };
  }
  componentDidMount() {}
  render() {
    return <div id={this.state.flowKey} />;
  }
}

export default Grapher;
