const BaseService = require('./base.service');

class BlueprintsService extends BaseService {
  async getBlueprintsDefinitions() {
    const url = `${this.javaApiUrl}/api/metadata/workflow`;
    const { data } = await this.get(url);

    return data;
  }

  async getBlueprintsByWorkflowType(workflowName) {
    const url = `${this.javaApiUrl}/api/metadata/workflow/${workflowName}`;
    const { data } = await this.get(url);

    return data;
  }
}

module.exports = BlueprintsService;
