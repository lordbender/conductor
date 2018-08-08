import React from 'react';
import axios from 'axios';
import moment from 'moment';
import map from 'lodash/fp/map';
import { OverlayTrigger, Button, Popover, Panel, Table, Tabs, Tab } from 'react-bootstrap';
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
  async componentWillMount() {
    await axios.get('/api/sys/').then(({ data: sys }) => {
      window.sys = sys;
    });
  }

  render() {
    let { workflow: wf, metadata } = this.props;
    if (wf == null) {
      wf = {};
    }
    if (wf.tasks == null) {
      wf.tasks = [];
    }
    let tasks = wf.tasks;
    tasks = tasks.sort((a, b) => {
      return a.seq - b.seq;
    });

    return (
      <div className="ui-content">
        <h4>
          {wf.workflowType}/{wf.version}
          <span
            className={
              wf.status === 'FAILED' || wf.status === 'TERMINATED' || wf.status === 'TIMED_OUT' ? 'red' : 'green'
            }
          >
            {wf.status}
          </span>
          <span>
            <WorkflowAction workflowStatus={wf.status} workflowId={wf.workflowId} />
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
              <td>{wf.workflowId}</td>
              <td>{wf.ownerApp}</td>
              <td>{execTime(wf.endTime, wf.startTime)}</td>
              <td>
                {formatDate(wf.startTime)} - {formatDate(wf.endTime)}
              </td>
              <td>{wf.correlationId}</td>
            </tr>
            <tr style={{ display: showFailure(wf) }}>
              <td style={{ color: '#ff0000' }} colSpan={5}>
                {getFailureReason(wf)}
              </td>
            </tr>
          </thead>
        </Table>

        <Tabs id="metadata-wrapper-main">
          <Tab eventKey={1} title="Execution Flow">
            <WorkflowMetaDia meta={metadata} wf={wf} subworkflows={this.props.subworkflows} />
          </Tab>
          <Tab eventKey={2} title="Task Details">
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
              {tableBody(tasks)}
            </Table>
            <br />
          </Tab>
          <Tab eventKey={3} title="Input/Output">
            <div>
              <strong>
                Workflow Input{' '}
                <i title="copy to clipboard" className="btn fa fa-clipboard" data-clipboard-target="#wfinput" />
              </strong>
              <pre style={{ height: '200px' }} id="wfinput">
                {JSON.stringify(wf.input, null, 3)}
              </pre>
              <strong>
                Workflow Output{' '}
                <i title="copy to clipboard" className="btn fa fa-clipboard" data-clipboard-target="#wfoutput" />
              </strong>
              <pre style={{ height: '200px' }} id="wfoutput">
                {JSON.stringify(wf.output == null ? {} : wf.output, null, 3)}
              </pre>
              {wf.status === 'FAILED' ? (
                <div>
                  <strong>Workflow Faiure Reason (if any)</strong>
                  <pre>{wf.reasonForIncompletion ? JSON.stringify(wf.reasonForIncompletion, null, 3) : ''}</pre>
                </div>
              ) : (
                ''
              )}
            </div>
          </Tab>
          <Tab eventKey={4} title="JSON">
            <i title="copy to clipboard" className="btn fa fa-clipboard" data-clipboard-target="#fulljson" />
            <pre style={{ height: '80%' }} id="fulljson">
              {JSON.stringify(wf, null, 3)}
            </pre>
          </Tab>
        </Tabs>
      </div>
    );
  }
}

export default WorkflowDetails;
