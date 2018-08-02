import React from 'react';
import { connect } from 'react-redux';
import { Table, Button } from 'react-bootstrap';
import { listWorkflows } from 'stores/workflow';

class List extends React.Component {
  async componentWillMount() {
    await this.props.listWorkflows();
  }

  render() {
    const { workflows } = this.props;

    return (
      <div className="ui-content">
        <h1>Workflows</h1>
        <Table striped bordered condensed hover>
          <thead>
            <tr>
              <th>Workflow ID</th>
              <th>Workflow Type</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {workflows.map(({ status, workflowId, workflowType }) => (
              <tr>
                <td>
                  <Button bsStyle="link" onClick={() => this.props.history.push(`/workflow/${workflowId}`)}>
                    {workflowId}
                  </Button>
                </td>
                <td>{workflowType}</td>
                <td>{status}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default connect(
  state => ({ workflows: state.workflow.list, totalCount: state.workflow.totalCount }),
  { listWorkflows }
)(List);
