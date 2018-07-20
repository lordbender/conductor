/* eslint-disable class-methods-use-this */
const express = require('express');

class StaticRoutes {
  init(app) {
    const staticFilesPath = `${__dirname}/../public`;

    // eslint-disable-next-line no-console
    console.debug('Static Files Directory', staticFilesPath);

    const location = express.static(staticFilesPath);

    app.use('/', location);
    app.use('/workflow/*', location);
  }
}

module.exports = StaticRoutes;
