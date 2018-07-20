const StaticRoutes = require('./static');
const WorkflowRoutes = require('./workflow');
const MetaRoutes = require('./meta');
const TasksRoutes = require('./tasks');

class RoutesIndex {
  constructor() {
    this.staticRoutes = new StaticRoutes();
    this.workflowRoutes = new WorkflowRoutes();
    this.metaRoutes = new MetaRoutes();
    this.tasksRoutes = new TasksRoutes();
  }

  init(app) {
    const {
      env: { BASE_URL = '/api/v1' }
    } = process;

    this.staticRoutes.init(app);
    this.workflowRoutes.init(app, BASE_URL);
    this.metaRoutes.init(app, BASE_URL);
    this.tasksRoutes.init(app, BASE_URL);
  }
}

module.exports = RoutesIndex;
