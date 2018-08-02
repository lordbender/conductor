import React from 'react';
import { connect } from 'react-redux';
import { Table, Button } from 'react-bootstrap';
import { listWorkflowDefs } from 'stores/metadata';

class List extends React.Component {
  async componentWillMount() {
    await this.props.listWorkflowDefs();
  }

  render() {
    const { workflowDefs } = this.props;

    return (
      <div className="ui-content">
        <h1>Workflows</h1>
        <Table striped bordered condensed hover>
          <thead>
            <tr>
              <th> Name/Version</th>
              <th>Input Parameters</th>
              <th>Tasks</th>
            </tr>
          </thead>
          <tbody>
            {workflowDefs.map(({ name, version, tasks }) => (
              <tr>
                <td>
                  <Button
                    bsStyle="link"
                    onClick={() => this.props.history.push(`/workflow/metadata/${name}/${version}`)}
                  >
                    {`${name} / ${version}`}
                  </Button>
                </td>
                <td>Larry the Bird</td>
                <td>@twitter</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default connect(
  state => ({ workflowDefs: state.metadata.list }),
  { listWorkflowDefs }
)(List);
