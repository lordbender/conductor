import React from 'react';
import uuid from 'uuid';
import { withRouter } from 'react-router-dom';
import { List, ListItem, ListItemIcon, ListItemText, Divider, Paper, Typography } from '@material-ui/core';

const menuItemTypes = {
  workflow: 0,
  metadata: 1,
  events: 2,
  queues: 3
};

const menuItems = [
  {
    type: menuItemTypes.workflow,
    header: true,
    label: 'Executions',
    href: '/events',
    icon: 'fa-star'
  },
  {
    type: menuItemTypes.workflow,
    label: 'All',
    href: '/workflow',
    icon: 'fa-circle-thin'
  },
  {
    type: menuItemTypes.workflow,
    label: 'Running',
    href: '/workflow?status=RUNNING',
    icon: 'fa-play-circle'
  },
  {
    type: menuItemTypes.workflow,
    label: 'Failed',
    href: '/workflow?status=FAILED&h=48',
    icon: 'fa-warning'
  },
  {
    type: menuItemTypes.workflow,
    label: 'Timed Out',
    href: '/workflow?status=TIMED_OUT&h=48',
    icon: 'fa-clock-o'
  },
  {
    type: menuItemTypes.workflow,
    label: 'Terminated',
    href: '/workflow?status=TERMINATED&h=48',
    icon: 'fa-ban'
  },
  {
    type: menuItemTypes.workflow,
    label: 'Completed',
    href: '/workflow?status=COMPLETED&h=48',
    icon: 'fa-bullseye'
  },
  {
    type: menuItemTypes.metadata,
    header: true,
    label: 'Metadata',
    href: '/events',
    icon: 'fa-star'
  },
  {
    type: menuItemTypes.metadata,
    label: 'Workflow Defs',
    href: '/metadata',
    icon: 'fa-code-fork'
  },
  {
    type: menuItemTypes.metadata,
    label: 'Tasks',
    href: '/metadata/tasks',
    icon: 'fa-tasks'
  },
  {
    type: menuItemTypes.events,
    header: true,
    label: 'Workflow Events',
    href: '/events',
    icon: 'fa-star'
  },
  {
    type: menuItemTypes.events,
    label: 'Event Handlers',
    href: '/events',
    icon: 'fa-star'
  },
  {
    type: menuItemTypes.queues,
    header: true,
    label: 'Task Queues',
    href: '/events',
    icon: 'fa-star'
  },
  {
    type: menuItemTypes.queues,
    label: 'Poll Data',
    href: '/workflow/queue/data',
    icon: 'fa-exchange'
  }
];

const MenuSection = props => {
  const { navigate, typeHelper } = props;
  const header = menuItems.find(x => x.type === typeHelper && x.header);
  const menu = menuItems.filter(x => x.type === typeHelper && !x.header).map(route => (
    <ListItem
      button
      onClick={() => {
        navigate(route.href);
      }}
      key={`key-${uuid.v4()}`}
    >
      <ListItemIcon>
        <i className={`fa ${route.icon}`} style={{ width: '20px' }} />
      </ListItemIcon>
      <ListItemText inset primary={route.label} />
    </ListItem>
  ));

  return [
    <Typography key={`key-${uuid.v4()}`} variant="headline" component="h3">
      {header.label}
    </Typography>,
    menu,
    <Divider key={`key-${uuid.v4()}`} />
  ];
};

const Menu = props => (
  <List component="nav">
    <MenuSection
      typeHelper={menuItemTypes.workflow}
      navigate={href => {
        props.history.push(href);
      }}
    />
    <MenuSection
      typeHelper={menuItemTypes.metadata}
      navigate={href => {
        props.history.push(href);
      }}
    />
    <MenuSection
      typeHelper={menuItemTypes.events}
      navigate={href => {
        props.history.push(href);
      }}
    />
    <MenuSection
      typeHelper={menuItemTypes.queues}
      navigate={href => {
        props.history.push(href);
      }}
    />
  </List>
);

export default withRouter(Menu);
