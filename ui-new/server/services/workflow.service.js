// http://localhost:8080/api/workflow/search-by-tasks?size=100&freeText=*

const BaseService = require('./base.service');

class WorkflowService extends BaseService {
  constructor() {
    super();
    this.javaApiUrl = process.env.JAVA_API_BASE_URL;
  }

  async list(start, size, sort, freeText, query) {
    const url = `${this.javaApiUrl}/api/workflow/search`;
    const { data } = await this.get(url);

    return data;
  }
}

module.exports = WorkflowService;
