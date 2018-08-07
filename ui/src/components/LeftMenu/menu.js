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
    href: '/metadata',
    icon: 'fa-code-fork'
  },
  {
    label: 'Tasks',
    href: '/metadata/tasks',
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

export default workflowMenuItems;
