import BaseService from './base.service';

class ElasticService extends BaseService {
  async executeQuery(query, token) {
    const result = await this.elastic(query, token);

    return result;
  }
}

module.exports = ElasticService;
