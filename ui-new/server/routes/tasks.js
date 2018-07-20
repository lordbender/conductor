/* eslint-disable class-methods-use-this */
class TasksRoutes {
  init(app, baseRoute) {
    app.get(`${baseRoute}/meta`, (req, res) => res.send('Hello Meta!'));
  }
}

module.exports = TasksRoutes;
