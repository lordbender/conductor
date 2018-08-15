import bodyParser from 'body-parser';
import AuthFilter from './filters/authFilter';

export default class PreMiddleware {
  init = app => {
    app.use(bodyParser.json());
    new AuthFilter().init(app);
  };
}
