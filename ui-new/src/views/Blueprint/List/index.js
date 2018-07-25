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
import { SelectableText } from 'components/StyledComponents';

import { fetchBlueprints } from 'stores/blueprint/list';

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
    await this.props.fetchBlueprints();
  }

  handleChangePage = async (_, page) => {
    await this.setState({ page });
  };

  handleChangeRowsPerPage = async event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  render() {
    const { blueprints = [], classes } = this.props;
    const { rowsPerPage, page } = this.state;

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, blueprints.length - page * rowsPerPage);

    const mapped = blueprints.map(({ name, description, version, createTime, tasks }) => (
      <TableRow key={`blueprint-row-key-${name}`}>
        <TableCell>
          <SelectableText onClick={() => this.props.history.push(`/blueprints/${name}`)}>{name}</SelectableText>
        </TableCell>
        <TableCell>{description}</TableCell>
        <TableCell>{version}</TableCell>
        <TableCell>{createTime}</TableCell>
        <TableCell>{tasks.length}</TableCell>
      </TableRow>
    ));

    const paging = (
      <TableRow>
        <TablePagination
          colSpan={3}
          count={blueprints.length}
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
                <TableCell>Blueprint Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Version</TableCell>
                <TableCell>Created</TableCell>
                <TableCell>Tasks Count</TableCell>
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
  blueprints: PropTypes.array.isRequired
};

export default connect(
  state => ({
    blueprints: state.blueprint.list.blueprints
  }),
  {
    fetchBlueprints
  }
)(withStyles(styles)(List));
