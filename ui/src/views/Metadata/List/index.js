import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { listWorkflowDefs } from '../../../stores/metadata';

class List extends React.Component {
  async componentWillMount() {
    await this.props.listWorkflowDefs();
  }

  render() {
    const { workflowDefs } = this.props;

    function jsonMaker(cell) {
      return JSON.stringify(cell);
    }

    function taskMaker(cell) {
      if (cell == null) {
        return '';
      }
      return JSON.stringify(
        cell.map(task => {
          return task.name;
        })
      );
    }

    function nameMaker(_, row) {
      return (
        <Link to={`/workflow/metadata/${row.name}/${row.version}`}>
          {row.name} / {row.version}
        </Link>
      );
    }

    return (
      <div className="ui-content">
        <h1>Workflows</h1>
        <BootstrapTable data={workflowDefs} striped hover search exportCSV={false} pagination={false}>
          <TableHeaderColumn dataField="name" isKey dataAlign="left" dataSort dataFormat={nameMaker}>
            Name/Version
          </TableHeaderColumn>
          <TableHeaderColumn dataField="inputParameters" dataSort dataFormat={jsonMaker}>
            Input Parameters
          </TableHeaderColumn>
          <TableHeaderColumn dataField="tasks" hidden={false} dataFormat={taskMaker}>
            Tasks
          </TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  }
}

export default connect(
  state => ({ workflowDefs: state.workflow }),
  { listWorkflowDefs }
)(List);
