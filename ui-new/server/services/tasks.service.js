const BaseService = require('./base.service');

class TasksService extends BaseService {
  async search(start, size, sort, freeText, query) {
    const url = `${this.javaApiUrl}/api/tasks/search`;
    const { data } = await this.get(url);

    return data;
  }
}

module.exports = TasksService;
