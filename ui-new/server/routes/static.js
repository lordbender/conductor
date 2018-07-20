class StaticRoutes {
    init(app){
        app.get('/', (req, res) => res.send('Hello STATIC!'));
    }
}

module.exports = StaticRoutes;