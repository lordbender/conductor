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
    const { flowKey } = nextState;
    const { blueprint } = nextProps;

    console.log('blueprint 2 => ', blueprint);
    const graphData = {
      nodes: [
        {
          id: 'id1',
          name: 'begin',
          nodeLabel: 'cool 1',
          nodeColor: '#333',
          val: 1
        },
        {
          id: 'id2',
          name: 'end',
          nodeLabel: 'cool 2',
          nodeColor: '#444',
          val: 10
        }
      ],
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
    return <ForceGraph2D id={flowKey} graphData={graphData} />;
  }
}

export default Grapher;
