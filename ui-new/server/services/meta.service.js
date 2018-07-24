const BaseService = require('./base.service');

class MetaService extends BaseService {
  async getByWorkflowName(workflowName) {
    const url = `${this.javaApiUrl}/api/metadata/workflow/${workflowName}`;
    const { data } = await this.get(url);

    return data;
  }
}

module.exports = MetaService;
