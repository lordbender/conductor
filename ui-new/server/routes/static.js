/* eslint-disable class-methods-use-this */
const express = require('express');

class StaticRoutes {
  init(app) {
    const staticFilesPath = `${__dirname}/../public`;
    console.debug('Static Files Firectory', staticFilesPath);
    const location = express.static(staticFilesPath);

    app.use('/', location);
    app.use('/workflow/*', location);
  }
}

module.exports = StaticRoutes;
