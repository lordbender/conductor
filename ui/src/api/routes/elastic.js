import EventsService from '../services/events.service';

class SystemRoutes {
  constructor() {
    this.eventsService = new EventsService();
  }

  init(app) {
    app.post('/api/elastic/', async (req, res, next) => {
      try {
        const { body } = req;

        console.log('body => ', body);
        res.status(200).send(body);
      } catch (err) {
        next(err);
      }
    });
  }
}

module.exports = SystemRoutes;
