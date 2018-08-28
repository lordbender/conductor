/* eslint-disable no-restricted-globals */

import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import uuid from 'uuid';
import { connect } from 'react-redux';
import Typeahead from 'react-bootstrap-typeahead';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { FormControl, Button, Panel, Popover, OverlayTrigger, ButtonGroup, Grid, Row, Col } from 'react-bootstrap';
import { listWorkflows } from 'stores/workflow';

function linkMaker(cell) {
  return <Link to={`/workflow/id/${cell}`}>{cell}</Link>;
}

function zeroPad(num) {
  return `0${num}`.slice(-2);
}

function formatDate(cell) {
  if (cell == null || !cell.split) {
    return '';
  }
  const c = cell.split('T');
  const time = c[1].split(':');
  const hh = zeroPad(time[0]);
  const mm = zeroPad(time[1]);
  const ss = zeroPad(time[2].replace('Z', ''));

  const dt = `${c[0]}T${hh}:${mm}:${ss}Z`;

  if (dt == null || dt === '') {
    return '';
  }

  return new Date(dt).toLocaleString('en-US');
}

function miniDetails(cell, row) {
  return (
    <ButtonGroup>
      <OverlayTrigger
        trigger="click"
        rootClose
        placement="left"
        overlay={
          <Popover id={`popover-id-${uuid.v4()}`} title="Workflow Details" width={400}>
            <span className="red">
              {row.reasonForIncompletion == null ? (
                ''
              ) : (
                <span>
                  {row.reasonForIncompletion}
                  <hr />
                </span>
              )}
            </span>
            <b>Input</b>
            <br />
            <span className="small" style={{ maxWidth: '400px' }}>
              {row.input}
            </span>
            <hr />
            <b>Output</b>
            <br />
            <span className="small">{row.output}</span>
            <hr />
            <br />
          </Popover>
        }
      >
        <Button bsSize="xsmall">details</Button>
      </OverlayTrigger>
    </ButtonGroup>
  );
}

class WorkflowList extends React.Component {
  constructor(props) {
    super(props);
    const {
      location: { query: { q = '', status = '', start = 0, h } = {} }
    } = props;

    this.state = {
      search: q === 'undefined' || q === '' ? '' : q,

      status: status !== '' ? status.split(',') : [],
      h,
      update: true,
      fullstr: true,
      start: !isNaN(start, 10) ? parseInt(start, 10) : start
    };
  }

  async componentWillMount() {
    await this.props.listWorkflows();
  }

  prefChange = e => {
    this.setState({
      fullstr: e.target.checked
    });
    this.state.update = true;
    this.refreshResults();
  };

  render() {
    const { totalHits = 0, hits = [] } = this.props;

    return (
      <div className="ui-content">
        <BootstrapTable
          data={hits}
          striped
          hover
          search={false}
          exportCSV={false}
          pagination={false}
          options={{ sizePerPage: 100 }}
        >
          <TableHeaderColumn dataField="workflowType" isKey dataAlign="left" dataSort>
            Workflow
          </TableHeaderColumn>
          <TableHeaderColumn dataField="workflowId" dataSort dataFormat={linkMaker}>
            Workflow ID
          </TableHeaderColumn>
          <TableHeaderColumn dataField="status" dataSort>
            Status
          </TableHeaderColumn>
          <TableHeaderColumn dataField="startTime" dataSort dataFormat={formatDate}>
            Start Time
          </TableHeaderColumn>
          <TableHeaderColumn dataField="updateTime" dataSort dataFormat={formatDate}>
            Last Updated
          </TableHeaderColumn>
          <TableHeaderColumn dataField="endTime" hidden={false} dataFormat={formatDate}>
            End Time
          </TableHeaderColumn>
          <TableHeaderColumn dataField="reasonForIncompletion" hidden={false}>
            Failure Reason
          </TableHeaderColumn>
          <TableHeaderColumn dataField="failedReferenceTaskNames" hidden={false}>
            Failed Tasks
          </TableHeaderColumn>
          <TableHeaderColumn dataField="input" width="300">
            Input
          </TableHeaderColumn>
          <TableHeaderColumn dataField="workflowId" width="300" dataFormat={miniDetails}>
            &nbsp;
          </TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  }
}

export default connect(
  state => ({
    hits: state.workflow.list,
    totalHits: state.workflow.totalHits
  }),
  { listWorkflows }
)(withRouter(WorkflowList));
