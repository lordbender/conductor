import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableFooter,
  TablePagination,
  TableRow,
  Paper
} from '@material-ui/core';
import TablePaginationActions from 'components/TablePaginationActions';
import { fetchTasks } from 'stores/tasks/list';

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
    await this.props.fetchTasks();
  }

  handleChangePage = async (_, page) => {
    await this.setState({ page });
  };

  handleChangeRowsPerPage = async event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  render() {
    const { tasks = [], totalHits = 0, classes } = this.props;
    const { rowsPerPage, page } = this.state;

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, tasks.length - page * rowsPerPage);

    const mapped = tasks.map(({ workflowId, workflowType, taskId, taskType, status, startTime, updateTime }) => (
      <TableRow key={`workflow-row-key-${workflowId}`}>
        <TableCell>{workflowId}</TableCell>
        <TableCell>{workflowType}</TableCell>
        <TableCell>{taskId}</TableCell>
        <TableCell>{taskType}</TableCell>
        <TableCell>{status}</TableCell>
        <TableCell>{startTime}</TableCell>
        <TableCell>{updateTime}</TableCell>
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
            <TableHead>
              <TableRow>
                <TableCell>Workflow Id</TableCell>
                <TableCell>Workflow Type</TableCell>
                <TableCell>Task Id</TableCell>
                <TableCell>Task Type</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Time Created</TableCell>
                <TableCell>Last Updated</TableCell>
              </TableRow>
            </TableHead>
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
  tasks: PropTypes.array.isRequired,
  totalHits: PropTypes.number.isRequired
};

export default connect(
  state => ({
    tasks: state.tasks.list.tasks,
    totalHits: state.tasks.list.totalHits
  }),
  {
    fetchTasks
  }
)(withStyles(styles)(List));
