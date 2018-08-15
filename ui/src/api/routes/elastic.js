import ElasticService from '../services/elastic.service';

class SystemRoutes {
  constructor() {
    this.elasticService = new ElasticService();
  }

  init(app) {
    app.post('/api/elastic/', async ({ body, token }, res, next) => {
      try {
        const result = await this.elasticService.executeQuery(body, token);
        res.status(200).send(result);
      } catch (err) {
        next(err);
      }
    });
  }
}

module.exports = SystemRoutes;
