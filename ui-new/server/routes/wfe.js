class WfeRoutes {
  init(app) {
    app.get('/wfe', (req, res) => res.send('Hello WFE!'));
  }
}

module.exports = WfeRoutes;
