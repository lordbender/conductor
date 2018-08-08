import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Tabs, Tab } from '@material-ui/core';
import TabContainer from 'components/TabContainer';
import { getWorkflowDefDetail } from 'stores/metadata';
import WorkflowMetaDia from 'views/Metadata/Detail/WorkflowMetaDia';

class Detail extends React.Component {
  state = {
    value: 0
  };

  async componentWillMount() {
    const {
      match: {
        params: { name, version }
      }
    } = this.props;
    await this.props.getWorkflowDefDetail(name, version);
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { workflowDef = { tasks: [] } } = this.props;
    const { value } = this.state;
    return (
      <div className="ui-content">
        <Tabs value={value} onChange={this.handleChange}>
          <Tab label="Diagram" />
          <Tab label="JSON" />
        </Tabs>
        {value === 0 && (
          <TabContainer>
            <div>
              <WorkflowMetaDia meta={workflowDef} tasks={[]} />
            </div>
          </TabContainer>
        )}
        {value === 1 && (
          <TabContainer>
            <div>
              <pre>{JSON.stringify(workflowDef, null, 2)}</pre>
            </div>
          </TabContainer>
        )}
      </div>
    );
  }
}

export default connect(
  state => ({ workflowDef: state.metadata.detail }),
  { getWorkflowDefDetail }
)(withRouter(Detail));
