import 'babel-polyfill';
import express from 'express';
import Bunyan from 'bunyan';

import MiddlewareIndex from './middleware';
import WorkflowRoutes from './routes/workflow';
import MetadataRoutes from './routes/metadata';
import SystemRoutes from './routes/system';
import EventsRoutes from './routes/events';
import TaskRoutes from './routes/tasks';


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
