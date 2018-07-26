/* eslint-disable */

import React, { Component } from 'react';
import uuid from 'uuid';
import { ForceGraph2D, ForceGraph3D, ForceGraphVR } from 'react-force-graph';

class Grapher extends Component {
  constructor() {
    super();
    const flowId = uuid.v4();

    this.state = {
      flowId,
      flowKey: `flow-chart-${flowId}`,
      graphData: {
        nodes: [],
        links: []
      }
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    const {
      blueprint: { tasks = [] }
    } = nextProps;

    console.log('tasks 2 => ', tasks);
    const nodes = tasks.map(({ name, taskReferenceName, type }) => ({
      id: taskReferenceName,
      name,
      type,
      nodeLabel: taskReferenceName,
      nodeColor: '#333',
      val: 1
    }));

    const graphData = {
      nodes: nodes,
      links: [
        {
          source: 'id1',
          target: 'id2'
        }
      ]
    };
    this.state = { graphData };

    return true;
  }

  render() {
    const { flowKey, graphData } = this.state;
    return <ForceGraph2D graphData={graphData} />;
  }
}

export default Grapher;
