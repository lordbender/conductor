import React from 'react';
import { Tabs, Tab } from '@material-ui/core';
import TabContainer from 'components/TabContainer';
import { connect } from 'react-redux';
import { getWorkflowMetaDetails } from '../../actions/WorkflowActions';
import WorkflowMetaDia from './WorkflowMetaDia';

class WorkflowMetaDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.params.name,
      version: props.params.version,
      workflowMeta: { tasks: [] },
      value: 0
    };
  }

  componentWillMount() {
    this.props.dispatch(getWorkflowMetaDetails(this.state.name, this.state.version));
  }

  componentWillReceiveProps({ params: { name, version }, meta: workflowMeta }) {
    this.setState({ name, version, workflowMeta });
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { workflowMeta = { tasks: [] }, value } = this.state;

    return (
      <div className="ui-content">
        <Tabs onChange={this.handleChange}>
          <Tab label="Diagram" />
          <Tab label="JSON" />
        </Tabs>
        {value === 0 && (
          <TabContainer>
            <div>
              <WorkflowMetaDia meta={workflowMeta} tasks={[]} />
            </div>
          </TabContainer>
        )}
        {value === 1 && (
          <TabContainer>
            <div>
              <pre>{JSON.stringify(workflowMeta, null, 2)}</pre>
            </div>
          </TabContainer>
        )}
      </div>
    );
  }
}

export default connect(state => state.workflow)(WorkflowMetaDetails);
