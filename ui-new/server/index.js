const express = require('express');
const RoutesIndex = require('./routes');

class Main {
  init() {
    this.app = express();
    this.routesIndex = new RoutesIndex();

    this.routes();
    this.serve();
  }

  routes() {
    this.routesIndex.init(this.app);
  }

  serve() {
    const {
      env: { PORT, OPENSHIFT_NODEJS_PORT, IP, OPENSHIFT_NODEJS_IP }
    } = process;

    const host = IP || OPENSHIFT_NODEJS_IP || '0.0.0.0';
    const port = PORT || OPENSHIFT_NODEJS_PORT || 3000;

    this.app.listen(port, host, () => console.log(`Example app listening on port ${host}:${port}!`));
  }
}

const main = new Main();
main.init();
