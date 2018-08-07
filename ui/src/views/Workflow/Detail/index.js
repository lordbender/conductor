import React from 'react';
import { connect } from 'react-redux';
import { getWorkflowById } from 'stores/workflow';
import { getWorkflowDefDetail } from 'stores/metadata';
import WorkflowDetails from 'views/Workflow/Detail/WorkflowDetails';

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
    const { workflow = {}, metadata = [] } = this.props;

    return (
      <div className="ui-content">
        <h1>Workflow</h1>
        <WorkflowDetails workflow={workflow} metadata={metadata} />
      </div>
    );
  }
}

export default connect(
  state => ({
    workflow: state.workflow.detail,
    metadata: state.metadata.detail
  }),
  { getWorkflowById, getWorkflowDefDetail }
)(List);
