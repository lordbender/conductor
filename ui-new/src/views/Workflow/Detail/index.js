import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grapher from 'components/Grapher';
import { fetchWorkflow } from 'stores/workflow/detail';
import { fetchBlueprint } from 'stores/blueprint/detail';

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

    const { workflowType } = await this.props.fetchWorkflow(workflowId);
    await this.props.fetchBlueprint(workflowType);
  }

  render() {
    const { workflow = {}, blueprint = {} } = this.props;

    return (
      <div>
        <Grapher blueprint={blueprint} />
        <pre id="test-graph">{JSON.stringify(workflow, null, 4)}</pre>
        <pre id="test-graph">{JSON.stringify(blueprint, null, 4)}</pre>
      </div>
    );
  }
}

List.propTypes = {
  workflow: PropTypes.object.isRequired,
  blueprint: PropTypes.object.isRequired
};

export default connect(
  state => ({
    workflow: state.workflow.detail.workflow,
    blueprint: state.blueprint.detail.blueprint
  }),
  {
    fetchWorkflow,
    fetchBlueprint
  }
)(withStyles(styles)(List));
