const BaseService = require('./base.service');

class TasksService extends BaseService {
  constructor() {
    super();
    this.javaApiUrl = process.env.JAVA_API_BASE_URL;
  }

  async list(start, size, sort, freeText, query) {
    const url = `${this.javaApiUrl}/api/tasks/search`;
    const { data } = await this.get(url);

    return data;
  }
}

module.exports = TasksService;
