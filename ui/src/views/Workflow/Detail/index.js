import React from 'react';
import { connect } from 'react-redux';
import { getWorkflowById } from 'stores/workflow';
import { getWorkflowDefDetail } from 'stores/metadata';

class List extends React.Component {
  async componentWillMount() {
    const {
      match: {
        params: { workflowId }
      }
    } = this.props;
    const { workflowType, version } = await this.props.getWorkflowById(workflowId);
    await this.props.getWorkflowDefDetail(workflowType, version);
  }

  render() {
    const { workflow = {}, workflowDef = [] } = this.props;

    return (
      <div className="ui-content">
        <h1>Workflow</h1>
        <pre>{JSON.stringify(workflow, null, 2)}</pre>
        <pre>{JSON.stringify(workflowDef, null, 2)}</pre>
      </div>
    );
  }
}

export default connect(
  state => ({
    workflow: state.workflow.detail,
    workflowDef: state.metadata.detail
  }),
  { getWorkflowById, getWorkflowDefDetail }
)(List);
