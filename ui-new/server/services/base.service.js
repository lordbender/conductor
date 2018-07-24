/* eslint-disable class-methods-use-this */
const axios = require('axios');

const methods = {
  get: 'get',
  post: 'post',
  put: 'put',
  delete: 'delete'
};

class BaseService {
  constructor() {
    this.javaApiUrl = process.env.JAVA_API_BASE_URL;
  }

  async baseRequest(url, method, body) {
    let result = {};
    try {
      const config = {
        url,
        method
      };

      if (body) {
        config.body = body;
      }

      result = await axios(config);
    } catch (e) {
      result = e;
    }

    return result;
  }

  async get(url) {
    return this.baseRequest(url, methods.get);
  }

  async post(url, body) {
    return this.baseRequest(url, methods.post, body);
  }

  async put(url, body) {
    return this.baseRequest(url, methods.put, body);
  }

  async delete(url) {
    return this.baseRequest(url, methods.delete);
  }
}

module.exports = BaseService;
