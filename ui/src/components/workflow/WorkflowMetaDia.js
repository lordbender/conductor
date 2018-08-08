import React, { Component } from 'react';
import Grapher from 'components/Grapher';
import Workflow2Graph from 'core/wfegraph';
import defaultTo from 'lodash/fp/defaultTo';

class WorkflowMetaDia extends Component {
  static getGraphState(props) {
    const wfe2graph = new Workflow2Graph();
    const subwfs = defaultTo({})(props.subworkflows);
    const wfe = defaultTo({ tasks: [] })(props.wfe);
    const { edges, vertices } = wfe2graph.convert(wfe, props.meta);
    const subworkflows = {};

    for (const refname in subwfs) {
      let submeta = subwfs[refname].meta;
      let subwfe = subwfs[refname].wfe;
      subworkflows[refname] = wfe2graph.convert(subwfe, submeta);
    }

    return { edges, vertices, subworkflows };
  }

  constructor(props) {
    super(props);

    this.state = WorkflowMetaDia.getGraphState(props);
  }

  componentWillReceiveProps(nextProps) {
    this.setState(WorkflowMetaDia.getGraphState(nextProps));
  }

  render() {
    const { edges, vertices, subworkflows } = this.state;

    return <Grapher edges={edges} vertices={vertices} layout="TD-auto" innerGraph={subworkflows} />;
  }
}

export default WorkflowMetaDia;
