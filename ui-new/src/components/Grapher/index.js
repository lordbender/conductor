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
    const { blueprint } = this.props;

    console.log('blueprint => ', blueprint);

    var draw = svg(flowKey);

    const r = draw.rect(100, 100).attr({ fill: '#f06' });
    r.x(100);
    r.y(150);

    const c = draw.circle(100);
    c.x(100);
    c.y(250);

    var e = draw.ellipse(200, 100);
    e.radius(75, 50);
    e.x(100);
    e.y(350);

    var p = draw
      .polygon('0,0 100,50 50,100')
      .fill('none')
      .stroke({ width: 1 });
    p.x(100);
    p.y(450);
  }

  render() {
    const { flowKey } = this.state;

    return <div id={flowKey} style={{ height: 1000 }} />;
  }
}

export default Grapher;
