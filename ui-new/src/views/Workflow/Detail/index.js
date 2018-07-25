import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grapher from 'components/Grapher';
import { fetchWorkflow } from 'stores/workflow/detail';

const styles = () => ({
  root: {
    width: '100%',
    marginTop: 3
  }
});

class List extends React.Component {
  async componentWillMount() {
    const {
      match: {
        params: { workflowId }
      }
    } = this.props;
    await this.props.fetchWorkflow(workflowId);
  }

  render() {
    const { workflow = {}, workflowMetaData = {}, classes } = this.props;

    return (
      <div>
        <pre id="test-graph">{JSON.stringify(workflow, null, 4)}</pre>
        <pre id="test-graph">{JSON.stringify(workflowMetaData, null, 4)}</pre>
      </div>
    );
  }
}

List.propTypes = {
  classes: PropTypes.object.isRequired,
  workflow: PropTypes.object.isRequired
};

export default connect(
  state => ({
    workflow: state.workflow.detail.workflow,
    workflowMetaData: state.workflow.detail.workflowMetaData
  }),
  {
    fetchWorkflow
  }
)(withStyles(styles)(List));
