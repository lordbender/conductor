import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { fetchWorkflow } from 'stores/workflow/detail';

const styles = () => ({
  root: {
    width: '100%',
    marginTop: 3
  }
});

class List extends React.Component {
  state = {
    page: 0,
    rowsPerPage: 5
  };

  async componentWillMount() {
    const {
      match: {
        params: { workflowId }
      }
    } = this.props;
    await this.props.fetchWorkflow(workflowId);
  }

  handleChangePage = async (_, page) => {
    await this.setState({ page });
  };

  handleChangeRowsPerPage = async event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  render() {
    const { workflow = {}, workflowMetaData = {}, classes } = this.props;

    return (
      <div>
        <pre>{JSON.stringify(workflowMetaData, null, 2)}</pre>
        <pre>{JSON.stringify(workflow, null, 2)}</pre>
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
