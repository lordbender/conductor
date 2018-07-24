const MetaService = require('../services/meta.service');

class MetaRoutes {
  constructor() {
    this.metaService = new MetaService();
  }

  init(app, baseRoute) {
    app.get(`${baseRoute}/meta/:workflowName`, async (req, res) => {
      const { workflowName } = req.params;
      const tasks = await this.metaService.getByWorkflowName(workflowName);
      return res.json(tasks);
    });
  }
}

module.exports = MetaRoutes;
