import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withRouter } from 'react-router';
import { withStyles } from '@material-ui/core/styles';
import { Divider, ListItemText, ListItemIcon, ListItem, List, Drawer } from '@material-ui/core';
import Collapse from '@material-ui/core/Collapse';
import {
  Home as HomeIcon,
  CallMerge as WorkIcon,
  CallSplit as TaskIcon,
  Settings as SettingsIcon,
  HelpOutline as HelpIcon,
  StarBorder
} from '@material-ui/icons';

import styles from './styles';

const SideNav = ({ classes, open, handleDrawerClose, history, children }) => (
  <div className={classes.root}>
    <Drawer
      variant="permanent"
      classes={{
        paper: classNames(classes.drawerPaper, !open && classes.drawerPaperClose)
      }}
      open={open}
    >
      <Divider />
      <List>
        <ListItem
          button
          onClick={() => {
            history.push('/');
            handleDrawerClose();
          }}
        >
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText inset primary="Home" />
        </ListItem>
        <ListItem
          button
          onClick={() => {
            history.push('/workflows');
            handleDrawerClose();
          }}
        >
          <ListItemIcon>
            <WorkIcon />
          </ListItemIcon>
          <ListItemText inset primary="Workflows" />
        </ListItem>
        <ListItem
          button
          onClick={() => {
            history.push('/tasks');
            handleDrawerClose();
          }}
        >
          <ListItemIcon>
            <TaskIcon />
          </ListItemIcon>
          <ListItemText inset primary="Tasks" />
        </ListItem>
        <ListItem
          button
          onClick={() => {
            history.push('/meta');
            handleDrawerClose();
          }}
        >
          <ListItemIcon>
            <StarBorder />
          </ListItemIcon>
          <ListItemText inset primary="Meta" />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem
          button
          onClick={() => {
            history.push('/help');
            handleDrawerClose();
          }}
        >
          <ListItemIcon>
            <HelpIcon />
          </ListItemIcon>
          <ListItemText inset primary="Help" />
        </ListItem>
        <ListItem
          button
          onClick={() => {
            history.push('/settings');
            handleDrawerClose();
          }}
        >
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText inset primary="Settings" />
        </ListItem>
      </List>
    </Drawer>
    {children}
  </div>
);

SideNav.propTypes = {
  classes: PropTypes.object.isRequired,
  handleDrawerClose: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired
};

export default withRouter(withStyles(styles, { withTheme: true })(SideNav));
