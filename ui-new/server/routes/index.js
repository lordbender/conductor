const StaticRoutes = require('./static');
const WfeRoutes = require('./wfe');

class RoutesIndex {
  constructor() {
    this.staticRoutes = new StaticRoutes();
    this.wfeRoutes = new WfeRoutes();
  }

  init(app) {
    this.staticRoutes.init(app);
    this.wfeRoutes.init(app);
  }
}

module.exports = RoutesIndex;
