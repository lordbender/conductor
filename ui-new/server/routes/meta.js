/* eslint-disable class-methods-use-this */
class MetaRoutes {
  init(app, baseRoute) {
    app.get(`${baseRoute}/meta`, (req, res) => res.send('Hello Meta!'));
  }
}

module.exports = MetaRoutes;
