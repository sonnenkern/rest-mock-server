var faker = require('faker');

module.exports = (app, db) => {

    app.route('/count')
        .get(function (req, res) {
            res.status(200).send({
                count: db.get('count').value()
            });
        })
        .put(function (req, res) {
            db.set('count', db.get('count') + 1).write();
            res.status(200).send();
        });

    app.route('/error403')
        .get(function (req, res) {
            res.status(403).send();
        });

    app.route('/helloWorld')
        .get(function (req, res) {
            res.status(200).send({
                message: 'Hello World!'
            });
        });

};