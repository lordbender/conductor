/* eslint-disable class-methods-use-this */
const WorkflowService = require('../services/workflow.service');

class WorkflowRoutes {
  constructor() {
    this.workflowService = new WorkflowService();
  }

  init(app, baseRoute) {
    app.get(`${baseRoute}/workflows`, async (req, res) => {
      const { start, size, sort, freeText, query } = req.query;
      const workflows = await this.workflowService.list(start, size, sort, freeText, query);
      return res.json(workflows);
    });
  }
}

module.exports = WorkflowRoutes;
