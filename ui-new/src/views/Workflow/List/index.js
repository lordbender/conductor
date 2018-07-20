import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TablePaginationActions from 'views/Workflow/TablePaginationActions';
import { fetchWorkflows } from 'stores/workflow/list';

const styles = () => ({
  root: {
    width: '100%',
    marginTop: 3
  },
  table: {
    minWidth: 500
  },
  tableWrapper: {
    overflowX: 'auto'
  }
});

class List extends React.Component {
  state = {
    page: 0,
    rowsPerPage: 5
  };

  async componentWillMount() {
    await this.props.fetchWorkflows();
  }

  handleChangePage = async (_, page) => {
    await this.setState({ page });
  };

  handleChangeRowsPerPage = async event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  render() {
    const { workflows = [], totalHits = 0, classes } = this.props;
    const { rowsPerPage, page } = this.state;

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, workflows.length - page * rowsPerPage);

    const mapped = workflows.map(({ workflowId, workflowType, status, startTime }) => (
      <TableRow key={`workflow-row-key-${workflowId}`}>
        <TableCell component="th" scope="row">
          {workflowType}
        </TableCell>
        <TableCell numeric>{status}</TableCell>
        <TableCell numeric>{startTime}</TableCell>
      </TableRow>
    ));
    const paging = (
      <TableRow>
        <TablePagination
          colSpan={3}
          count={totalHits}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
          ActionsComponent={TablePaginationActions}
        />
      </TableRow>
    );

    return (
      <Paper className={classes.root}>
        <div className={classes.tableWrapper}>
          <Table className={classes.table}>
            <TableBody>
              {mapped}
              {emptyRows > 0 && (
                <TableRow style={{ height: 48 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>{paging}</TableFooter>
          </Table>
        </div>
      </Paper>
    );
  }
}

List.propTypes = {
  classes: PropTypes.object.isRequired,
  workflows: PropTypes.array.isRequired,
  totalHits: PropTypes.number.isRequired
};

export default connect(
  state => ({
    workflows: state.workflow.list.workflows,
    totalHits: state.workflow.list.totalHits
  }),
  {
    fetchWorkflows
  }
)(withStyles(styles)(List));
