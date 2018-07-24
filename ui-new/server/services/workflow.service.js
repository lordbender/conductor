const BaseService = require('./base.service');

class WorkflowService extends BaseService {
  async search(start, size, sort, freeText, query) {
    const url = `${this.javaApiUrl}/api/workflow/search`;
    const { data } = await this.get(url);

    return data;
  }

  async getById(workflowId) {
    const url = `${this.javaApiUrl}/api/workflow/${workflowId}`;
    const { data } = await this.get(url);

    return data;
  }
}

module.exports = WorkflowService;
