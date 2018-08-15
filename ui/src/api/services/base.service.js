import axios from 'axios';
import elasticsearch from 'elasticsearch';

class BaseService {
  constructor() {
    const { WF_SERVER, ELASTIC_ENDPOINT } = process.env;
    this.hostName = WF_SERVER;

    this.elasticClient = new elasticsearch.Client({
      host: ELASTIC_ENDPOINT,
      log: 'error'
    });
  }

  handleError = e => {
    // eslint-disable-next-line no-console
    console.error(e);
    return e;
  };

  // eslint-disable-next-line no-confusing-arrow
  config = token =>
    token
      ? { headers: { Accept: 'application/json', Authorization: token } }
      : { headers: { Accept: 'application/json' } };

  async elastic(query) {
    try {
      console.log('query =>', query);
      const response = await this.elasticClient.search(query);
      return response;
    } catch (e) {
      return this.handleError(e);
    }
  }

  async get(url, token) {
    try {
      const { data } = await axios({ ...this.config(token), method: 'GET', url: `${this.hostName}${url}` });
      return data;
    } catch (e) {
      return this.handleError(e);
    }
  }

  async post(url, body, token) {
    try {
      const { data } = await axios({
        ...this.config(token),
        method: 'POST',
        url: `${this.hostName}${url}`,
        data: body
      });
      return data;
    } catch (e) {
      return this.handleError(e);
    }
  }

  async put(url, body, token) {
    try {
      const { data } = await axios({ ...this.config(token), method: 'PUT', url: `${this.hostName}${url}`, data: body });
      return data;
    } catch (e) {
      return this.handleError(e);
    }
  }

  async delete(url, token) {
    try {
      const { data } = await axios({ ...this.config(token), method: 'DELETE', url: `${this.hostName}${url}` });
      return data;
    } catch (e) {
      return this.handleError(e);
    }
  }
}

module.exports = BaseService;
