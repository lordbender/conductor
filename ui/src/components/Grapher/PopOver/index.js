import React from 'react';
import { Table } from 'react-bootstrap';
import { Tabs, Tab, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@material-ui/core';
import TabContainer from 'components/TabContainer';

export default class PopOver extends React.Component {
  state = {
    value: 0
  };
  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const {
      hideProps,
      showSideBar = false,
      selectedTask,
      selectedTask: {
        taskType,
        status,
        reasonForIncompletion,
        referenceTaskName,
        callbackAfterSeconds,
        inputData,
        outputData,
        logs,
        pollCount
      }
    } = this.props;

    const { value } = this.state;

    return (
      <Dialog open={showSideBar} fullWidth aria-labelledby="simple-dialog-title">
        <DialogTitle id="simple-dialog-title">Set backup account</DialogTitle>
        <DialogContent>
          <h4 className="props-header">
            {taskType} ({status})
          </h4>
          <div
            style={{
              color: '#ff0000',
              display: status === 'FAILED' ? '' : 'none'
            }}
          >
            {reasonForIncompletion}
          </div>
          <Tabs value={value} onChange={this.handleChange}>
            <Tab label="Summary" />
            <Tab label="JSON" />
            <Tab label="Logs" />
          </Tabs>
          {value === 0 && (
            <TabContainer>
              <Table responsive striped={false} hover={false} condensed={false} bordered>
                <tbody>
                  <tr>
                    <th>Task Ref. Name</th>
                    <td colSpan="3" style={{ colSpan: 3 }}>
                      {referenceTaskName}
                    </td>
                  </tr>
                  <tr>
                    <th>Poll Count</th>
                    <td>{pollCount}</td>
                    <th>Callback After</th>
                    <td>
                      {callbackAfterSeconds || 0}
                      (second)
                    </td>
                  </tr>
                  <tr>
                    <th colSpan="4">
                      Input
                      <i title="copy to clipboard" className="btn fa fa-clipboard" data-clipboard-target="#t_input" />
                    </th>
                  </tr>
                  <tr>
                    <td colSpan="4">
                      <pre style={{ width: `${window.outerWidth / 2 - 140}px` }} id="t_input">
                        {JSON.stringify(inputData, null, 3)}
                      </pre>
                    </td>
                  </tr>
                  <tr>
                    <th colSpan="4">
                      Output
                      <i title="copy to clipboard" className="btn fa fa-clipboard" data-clipboard-target="#t_output" />
                    </th>
                  </tr>
                  <tr>
                    <td colSpan="4">
                      <pre style={{ width: `${window.outerWidth / 2 - 140}px` }} id="t_output">
                        {JSON.stringify(outputData, null, 3)}
                      </pre>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </TabContainer>
          )}
          {value === 1 && (
            <TabContainer>
              <br />
              <i title="copy to clipboard" className="btn fa fa-clipboard" data-clipboard-target="#t_json" />
              <pre id="t_json">{JSON.stringify(selectedTask, null, 3)}</pre>
            </TabContainer>
          )}
          {value === 2 && (
            <TabContainer>
              <br />
              <i title="copy to clipboard" className="btn fa fa-clipboard" data-clipboard-target="#t_logs" />
              <pre id="t_logs">{JSON.stringify(logs, null, 3)}</pre>
            </TabContainer>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={hideProps} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
