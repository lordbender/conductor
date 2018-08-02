/* eslint-disable class-methods-use-this */
require('dotenv').config();

const express = require('express');
const Bunyan = require('bunyan');
const MiddlewareIndex = require('./middleware');
const WorkflowRoutes = require('./routes/workflow');
const MetadataRoutes = require('./routes/metadata');
const SystemRoutes = require('./routes/system');
const EventsRoutes = require('./routes/events');
const TaskRoutes = require('./routes/tasks');

const log = Bunyan.createLogger({ src: true, name: 'Conductor UI' });

class Main {
  init() {
    const app = express();
    const middlewareIndex = new MiddlewareIndex();

    this.preMiddlewareConfig(app, middlewareIndex);
    this.staticConfig(app);
    this.routesConfig(app);
    this.postMiddlewareConfig(app, middlewareIndex);
    this.startServer(app);
  }

  preMiddlewareConfig(app, middlewareIndex) {
    middlewareIndex.before(app);
  }

  staticConfig(app) {
    const staticContent = express.static('public');

    app.use('/', staticContent);
    app.use('/workflow/*', staticContent);
  }

  routesConfig(app) {
    new WorkflowRoutes().init(app);
    new MetadataRoutes().init(app);
    new TaskRoutes().init(app);
    new SystemRoutes().init(app);
    new EventsRoutes().init(app);
  }

  postMiddlewareConfig(app, middlewareIndex) {
    middlewareIndex.after(app);
  }

  startServer(app) {
    const server = app.listen(process.env.NODE_PORT || 5000, () => {
      const { address: host, port } = server.address();

      log.info('Workflow UI listening at http://%s:%s', host, port);
      if (process.send) {
        process.send('online');
      }
    });
  }
}

new Main().init();
