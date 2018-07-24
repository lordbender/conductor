const TasksService = require('../services/tasks.service');

class TasksRoutes {
  constructor() {
    this.tasksService = new TasksService();
  }

  init(app, baseRoute) {
    app.get(`${baseRoute}/tasks`, async (req, res) => {
      const { start, size, sort, freeText, query } = req.query;
      const tasks = await this.tasksService.search(start, size, sort, freeText, query);
      return res.json(tasks);
    });
  }
}

module.exports = TasksRoutes;
