/* eslint-disable consistent-return, class-methods-use-this */

class AuthFilter {
  init(app) {
    app.use((req, _, next) => {
      const { headers: { authorization = '' } = {} } = req;

      if (!authorization) {
        return next();
      }

      req.token = authorization;

      next();
    });
  }
}

module.exports = AuthFilter;
