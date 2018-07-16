import React  from 'react';
import { Input, Popover, OverlayTrigger } from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { connect } from 'react-redux';
import { getTaskDefs } from '../../../actions/WorkflowActions';

const TaskMetaList = React.createClass({
  getInitialState() {
    return {
      name: '',
      version: '',
      taskDefs: []
    };
  },

  componentWillMount() {
    this.props.dispatch(getTaskDefs());
  },

  componentWillReceiveProps(nextProps) {
    this.state.taskDefs = nextProps.taskDefs;
  },

  render() {
    const { taskDefs } = this.state;
    function retries(_, row) {
      const { retryDelaySeconds, retryLogic } = row;
      if (retryLogic == 'FIXED') {
        return `${retryLogic}(${retryDelaySeconds} seconds)`;
      }
    }

    function editor(cell, row) {
      const {
        name,
        retryCount,
        retryLogic,
        retryDelaySeconds,
        timeoutPolicy,
        responseTimeoutSeconds,
        timeoutSeconds,
        concurrentExecLimit,
        description
      } = row;

      return (
        <OverlayTrigger
          trigger="click"
          rootClose
          placement="right"
          overlay={
            <Popover id="popover-task-meta-list-editor" title={name} style={{ width: '500px' }}>
              <div className="left">
                <form>
                  <Input type="text" ref="retryCount" value={retryCount} addonBefore="Retry Count" addonAfter="Times" />
                  <br />
                  <Input type="select" ref="retryLogic" value={retryLogic} addonBefore="Retry Logic">
                    <option value="FIXED">FIXED</option>
                    <option value="EXPONENTIAL_BACKOFF">EXPONENTIAL_BACKOFF</option>
                  </Input>
                  <br />
                  <Input
                    type="text"
                    ref="retryDelaySeconds"
                    value={retryDelaySeconds}
                    addonBefore="Retry Delay"
                    addonAfter="Seconds"
                  />
                  <br />
                  <Input type="select" ref="timeoutPolicy" value={timeoutPolicy} addonBefore="Time Out Action">
                    <option value="RETRY_TASK">RETRY TASK</option>
                    <option value="TIME_OUT_WF">TIME_OUT_WF</option>
                  </Input>
                  <br />
                  <Input
                    type="text"
                    ref="timeoutSeconds"
                    value={timeoutSeconds}
                    addonBefore="Time Out"
                    addonAfter="Seconds"
                  />
                  <br />
                  <Input
                    type="text"
                    ref="restimeoutSeconds"
                    value={responseTimeoutSeconds}
                    addonBefore="Response Time Out"
                    addonAfter="timeoutSeconds"
                  />
                  <br />
                  <Input
                    type="text"
                    ref="concurrentExecLimit"
                    value={concurrentExecLimit}
                    addonBefore="Concurrent Exec Limit"
                  />
                  <br />
                  <Input type="textarea" label="Task Description" defaultValue={description} readonly={true} />
                  <br />
                </form>
              </div>
            </Popover>
          }
        >
          <a>{cell}</a>
        </OverlayTrigger>
      );
    }

    return (
      <div className="ui-content">
        <h1>Task Definitions</h1>
        <BootstrapTable data={taskDefs} striped={true} hover={true} search={true} exportCSV={false} pagination={false}>
          <TableHeaderColumn dataField="name" isKey={true} dataAlign="left" dataSort={true} dataFormat={editor}>
            Name/Version
          </TableHeaderColumn>
          <TableHeaderColumn dataField="ownerApp" dataSort={true}>
            Owner App
          </TableHeaderColumn>
          <TableHeaderColumn dataField="timeoutPolicy" dataSort={true}>
            Timeout Policy
          </TableHeaderColumn>
          <TableHeaderColumn dataField="timeoutSeconds" dataSort={true}>
            Timeout Seconds
          </TableHeaderColumn>
          <TableHeaderColumn dataField="responseTimeoutSeconds" dataSort={true}>
            Response Timeout Seconds
          </TableHeaderColumn>
          <TableHeaderColumn dataField="retryCount" dataSort={true}>
            Retry Count
          </TableHeaderColumn>
          <TableHeaderColumn dataField="concurrentExecLimit" dataSort={true}>
            Concurrent Exec Limit
          </TableHeaderColumn>
          <TableHeaderColumn dataField="retryLogic" dataSort={true} dataFormat={retries}>
            Retry Logic
          </TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  }
});
export default connect(state => state.workflow)(TaskMetaList);
