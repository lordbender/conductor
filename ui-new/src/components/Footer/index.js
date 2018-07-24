import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  root: {
    flexGrow: 1
  },
  flex: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
};

const Footer = ({ classes }) => <div className={classes.root}>Footer</div>;

export default withStyles(styles)(Footer);
