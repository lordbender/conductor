const MetaService = require('../services/blueprints.service');

class BlueprintsRoutes {
  constructor() {
    this.metaService = new MetaService();
  }

  init(app, baseRoute) {
    app.get(`${baseRoute}/blueprints`, async (_, res) => {
      const tasks = await this.metaService.getBlueprintsDefinitions();
      return res.json(tasks);
    });

    app.get(`${baseRoute}/blueprints/:workflowType`, async (req, res) => {
      const { workflowType } = req.params;
      const tasks = await this.metaService.getBlueprintsByWorkflowType(workflowType);
      return res.json(tasks);
    });
  }
}

module.exports = BlueprintsRoutes;
