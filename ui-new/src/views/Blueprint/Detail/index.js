import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grapher from 'components/Grapher';
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
        params: { workflowType }
      }
    } = this.props;
    await this.props.fetchBlueprint(workflowType);
  }

  render() {
    const { blueprint = {} } = this.props;

    return (
      <div>
        <Grapher blueprint={blueprint} />
        <pre id="test-graph">{JSON.stringify(blueprint, null, 4)}</pre>
      </div>
    );
  }
}

List.propTypes = {
  blueprint: PropTypes.object.isRequired
};

export default connect(
  state => ({
    blueprint: state.blueprint.detail.blueprint
  }),
  {
    fetchBlueprint
  }
)(withStyles(styles)(List));
