import React from 'react';
import axios from 'axios';
import moment from 'moment';
import map from 'lodash/fp/map';
import { OverlayTrigger, Button, Popover, Panel, Table } from 'react-bootstrap';
import { Tabs, Tab } from '@material-ui/core';
import TabContainer from 'components/TabContainer';
import WorkflowAction from 'components/workflow/executions/WorkflowAction';
import WorkflowMetaDia from 'components/workflow/WorkflowMetaDia';

function formatDate(dt) {
  if (dt == null || dt === '') {
    return '';
  }
  return moment(dt).format('MM/DD/YYYY, HH:mm:ss:SSS');
}

function execTime(end, start) {
  if (end == null || end === 0) {
    return '';
  }

  const total = end - start;

  return total / 1000;
}

function workerLink(type, cell) {
  if (cell == null) {
    return '';
  }
  let href = window.sys.env[type] || '#';
  if (href !== '#') {
    href = href.replace('%s', cell);
  } else {
    href = window.sys.env.WORKER_LINK;
    href = href || '#';
    href = href.replace('%s', cell);
  }
  return (
    <a target="_new" href={href}>
      {cell}
    </a>
  );
}

function popoverLink(cell, row) {
  return (
    <OverlayTrigger
      trigger="click"
      rootClose
      placement="left"
      overlay={
        <Popover id="task-details-wfd" title="Task Details" style={{ width: '800px' }}>
          <Panel
            header={
              <span>
                <span>Task Input</span>{' '}
                <i title="copy to clipboard" className="btn fa fa-clipboard" data-clipboard-target="#input" />
              </span>
            }
          >
            <span className="small">
              <pre id="input">{JSON.stringify(row.inputData, null, 2)}</pre>
            </span>
          </Panel>
          <Panel
            header={
              <span>
                <span>Task Output</span>{' '}
                <i title="copy to clipboard" className="btn fa fa-clipboard" data-clipboard-target="#output" />
              </span>
            }
          >
            <span className="small">
              <pre id="output">{JSON.stringify(row.outputData, null, 2)}</pre>
            </span>
          </Panel>
          <Panel header="Task Failure Reason (if any)">
            <span className="small">{JSON.stringify(row.reasonForIncompletion, null, 2)}</span>
          </Panel>
        </Popover>
      }
    >
      <Button bsStyle="default" bsSize="xsmall">
        Input/Output
      </Button>
    </OverlayTrigger>
  );
}

function tableRow(task) {
  return (
    <tr key={task.seq}>
      <td>{task.seq}</td>
      <td>{task.taskType}</td>
      <td>{task.referenceTaskName}</td>
      <td>{formatDate(task.scheduledTime)}</td>
      <td>
        {formatDate(task.startTime)} <br /> {formatDate(task.endTime)}
      </td>
      <td>{task.status}</td>
      <td>{formatDate(task.updateTime)}</td>
      <td>{task.callbackAfterSeconds == null ? 0 : task.callbackAfterSeconds}</td>
      <td>{task.pollCount}</td>
      <td>
        {popoverLink(null, task)}
        <br />
        {workerLink(task.taskType, task.workerId)}
      </td>
    </tr>
  );
}

function tableBody(tasks) {
  return <tbody>{map(tableRow)(tasks)}</tbody>;
}

function getFailureReason(wf) {
  return wf.reasonForIncompletion;
}

function showFailure(wf) {
  if (wf.status === 'FAILED' || wf.status === 'TERMINATED' || wf.status === 'TIMED_OUT') {
    return '';
  }
  return 'none';
}

class WorkflowDetails extends React.Component {
  state = {
    value: 0
  };

  async componentWillMount() {
    await axios.get('/api/sys/').then(({ data: sys }) => {
      window.sys = sys;
    });
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const {
      workflow: {
        input,
        correlationId,
        ownerApp,
        version,
        workflowId,
        status,
        workflowType,
        startTime,
        endTime,
        output,
        reasonForIncompletion,
        tasks = []
      },
      workflow,
      subworkflows = {},
      metadata
    } = this.props;

    const { value } = this.state;

    const sortedTasks = tasks.sort((a, b) => a.seq - b.seq);

    return (
      <div className="ui-content">
        <h4>
          {workflowType}/{version}
          <span className={status === 'FAILED' || status === 'TERMINATED' || status === 'TIMED_OUT' ? 'red' : 'green'}>
            {status}
          </span>
          <span>
            <WorkflowAction workflowStatus={status} workflowId={workflowId} />
          </span>
        </h4>
        <br />
        <br />
        <Table responsive striped={false} hover={false} condensed={false} bordered>
          <thead>
            <tr>
              <th>Workflow ID</th>
              <th>Owner App</th>
              <th>Total Time (sec)</th>
              <th>Start/End Time</th>
              <th>Correlation ID</th>
            </tr>
            <tr>
              <td>{workflowId}</td>
              <td>{ownerApp}</td>
              <td>{execTime(endTime, startTime)}</td>
              <td>
                {formatDate(startTime)} - {formatDate(endTime)}
              </td>
              <td>{correlationId}</td>
            </tr>
            <tr style={{ display: showFailure(workflow) }}>
              <td style={{ color: '#ff0000' }} colSpan={5}>
                {getFailureReason(workflow)}
              </td>
            </tr>
          </thead>
        </Table>

        <Tabs value={value} onChange={this.handleChange}>
          <Tab label="Execution Flow" />
          <Tab label="Task Details" />
          <Tab label="Input/Output" />
          <Tab label="JSON" />
        </Tabs>
        {value === 0 && (
          <TabContainer>
            <WorkflowMetaDia meta={metadata} wf={workflow} subworkflows={subworkflows} />
          </TabContainer>
        )}
        {value === 1 && (
          <TabContainer>
            <Table responsive striped hover condensed={false} bordered>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Task Type</th>
                  <th>Task Ref. Name</th>
                  <th>Scheduled Time</th>
                  <th>Start/End Time</th>
                  <th>Status</th>
                  <th>Last Polled/Updated</th>
                  <th>Callback After</th>
                  <th>Poll Count</th>
                  <th>Details</th>
                </tr>
              </thead>
              {tableBody(sortedTasks)}
            </Table>
            <br />
          </TabContainer>
        )}
        {value === 2 && (
          <TabContainer>
            <div>
              <strong>
                Workflow Input{' '}
                <i title="copy to clipboard" className="btn fa fa-clipboard" data-clipboard-target="#wfinput" />
              </strong>
              <pre style={{ height: '200px' }} id="wfinput">
                {JSON.stringify(input, null, 3)}
              </pre>
              <strong>
                Workflow Output{' '}
                <i title="copy to clipboard" className="btn fa fa-clipboard" data-clipboard-target="#wfoutput" />
              </strong>
              <pre style={{ height: '200px' }} id="wfoutput">
                {JSON.stringify(output == null ? {} : output, null, 3)}
              </pre>
              {status === 'FAILED' ? (
                <div>
                  <strong>Workflow Faiure Reason (if any)</strong>
                  <pre>{reasonForIncompletion ? JSON.stringify(reasonForIncompletion, null, 3) : ''}</pre>
                </div>
              ) : (
                ''
              )}
            </div>
          </TabContainer>
        )}
        {value === 3 && (
          <TabContainer>
            <i title="copy to clipboard" className="btn fa fa-clipboard" data-clipboard-target="#fulljson" />
            <pre style={{ height: '80%' }} id="fulljson">
              {JSON.stringify(workflow, null, 3)}
            </pre>
          </TabContainer>
        )}
      </div>
    );
  }
}

export default WorkflowDetails;
