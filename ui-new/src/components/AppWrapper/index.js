import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from 'components/AppBar';
import SideNav from 'components/SideNav';
import Footer from 'components/Footer';
import styles from './styles';

class AppWrapper extends React.Component {
  state = {
    open: false
  };

  handleDrawerToggle = () => {
    const { open } = this.state;
    this.setState({ open: !open });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes, children } = this.props;
    const { open } = this.state;
    return (
      <div className={classes.root}>
        <AppBar handleDrawerToggle={this.handleDrawerToggle} />
        <SideNav open={open} handleDrawerClose={this.handleDrawerClose}>
          <main className={classes.content}>
            <div className={classes.toolbar} />
            {children}
          </main>
        </SideNav>
        <Footer />
      </div>
    );
  }
}

AppWrapper.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.element.isRequired
};

export default withStyles(styles)(AppWrapper);
