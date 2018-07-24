const WorkflowService = require('../services/workflow.service');

class WorkflowRoutes {
  constructor() {
    this.workflowService = new WorkflowService();
  }

  init(app, baseRoute) {
    app.get(`${baseRoute}/workflows`, async (req, res) => {
      const { start, size, sort, freeText, query } = req.query;
      const workflows = await this.workflowService.search(start, size, sort, freeText, query);
      return res.json(workflows);
    });

    app.get(`${baseRoute}/workflows/:workflowId`, async (req, res) => {
      const { workflowId } = req.params;
      const workflow = await this.workflowService.getById(workflowId);
      return res.json(workflow);
    });
  }
}

module.exports = WorkflowRoutes;
