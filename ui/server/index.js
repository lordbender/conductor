import 'babel-polyfill';
import express from 'express';
import Bunyan from 'bunyan';
import MiddlewareIndex from './api/middleware';

const log = Bunyan.createLogger({ src: true, name: 'Conductor UI' });

const WorkflowRoutes = require('./api/routes/workflow');
const MetadataRoutes = require('./api/routes/metadata');
const SystemRoutes = require('./api/routes/system');
const EventsRoutes = require('./api/routes/events');
const TaskRoutes = require('./api/routes/tasks');

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

  preMiddlewareConfig = (app, middlewareIndex) => {
    middlewareIndex.before(app);
  };

  staticConfig = app => {
    const staticContent = express.static('public');

    app.use('/', staticContent);
    app.use('/workflow/*', staticContent);
  };

  routesConfig = app => {
    new WorkflowRoutes().init(app);
    new MetadataRoutes().init(app);
    new TaskRoutes().init(app);
    new SystemRoutes().init(app);
    new EventsRoutes().init(app);
  };

  postMiddlewareConfig = (app, middlewareIndex) => {
    middlewareIndex.after(app);
  };

  startServer = app => {
    const server = app.listen(process.env.NODE_PORT || 5000, () => {
      const { address: host, port } = server.address();

      log.info('Workflow UI listening at http://%s:%s', host, port);
      if (process.send) {
        process.send('online');
      }
    });
  };
}

const main = new Main();

main.init();
