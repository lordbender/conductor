import React from 'react';
import uuid from 'uuid';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const workflowMenuItems = [
  {
    header: true,
    label: 'Executions',
    href: '/events',
    icon: 'fa-star'
  },
  {
    label: 'All',
    href: '/workflow',
    icon: 'fa-circle-thin'
  },
  {
    label: 'Running',
    href: '/workflow?status=RUNNING',
    icon: 'fa-play-circle'
  },
  {
    label: 'Failed',
    href: '/workflow?status=FAILED&h=48',
    icon: 'fa-warning'
  },
  {
    label: 'Timed Out',
    href: '/workflow?status=TIMED_OUT&h=48',
    icon: 'fa-clock-o'
  },
  {
    label: 'Terminated',
    href: '/workflow?status=TERMINATED&h=48',
    icon: 'fa-ban'
  },
  {
    label: 'Completed',
    href: '/workflow?status=COMPLETED&h=48',
    icon: 'fa-bullseye'
  },
  {
    header: true,
    label: 'Metadata',
    href: '/events',
    icon: 'fa-star'
  },
  {
    label: 'Workflow Defs',
    href: '/workflow/metadata',
    icon: 'fa-code-fork'
  },
  {
    label: 'Tasks',
    href: '/workflow/metadata/tasks',
    icon: 'fa-tasks'
  },
  {
    header: true,
    label: 'Workflow Events',
    href: '/events',
    icon: 'fa-star'
  },
  {
    label: 'Event Handlers',
    href: '/events',
    icon: 'fa-star'
  },
  {
    header: true,
    label: 'Task Queues',
    href: '/events',
    icon: 'fa-star'
  },
  {
    label: 'Poll Data',
    href: '/workflow/queue/data',
    icon: 'fa-exchange'
  }
];

const LeftMenu = props => {
  const menu = workflowMenuItems.filter(item => !item.header).map((item, i) => (
    <div
      onClick={() => {
        props.history.push(item.href);
      }}
      key={`key-${uuid.v4()}`}
    >
      <div className="menuItem">
        <i className={`fa ${item.icon}`} style={{ width: '20px' }} />
        <span style={{ marginLeft: '10px' }}>{item.label}</span>
      </div>
    </div>
  ));

  return (
    <div className="left-menu">
      <div className="logo textual pull-left">
        <a href="/" title="Conductor">
          <h4>
            <i className="fa fa-bars" />
            Conductor
          </h4>
        </a>
      </div>
      <div className="menuList">{menu}</div>
    </div>
  );
};

// eslint-disable-next-line
export default connect(state => ({}))(withRouter(LeftMenu));
