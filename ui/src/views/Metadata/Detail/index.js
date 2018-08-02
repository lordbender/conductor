import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Tabs, Tab } from 'react-bootstrap';
import { getWorkflowDefDetail } from 'stores/metadata';
import WorkflowMetaDia from 'views/Metadata/Detail/WorkflowMetaDia';

class Detail extends React.Component {
  async componentWillMount() {
    const {
      match: {
        params: { name, version }
      }
    } = this.props;
    await this.props.getWorkflowDefDetail(name, version);
  }

  render() {
    const { workflowDef = { tasks: [] } } = this.props;

    return (
      <div className="ui-content">
        <Tabs>
          <Tab eventKey={1} title="Diagram">
            <div>
              <WorkflowMetaDia meta={workflowDef} tasks={[]} />
            </div>
          </Tab>
          <Tab eventKey={2} title="JSON">
            <div>
              <pre>{JSON.stringify(workflowDef, null, 2)}</pre>
            </div>
          </Tab>
        </Tabs>
      </div>
    );
  }
}

export default connect(
  state => ({ workflowDef: state.metadata.detail }),
  { getWorkflowDefDetail }
)(withRouter(Detail));
