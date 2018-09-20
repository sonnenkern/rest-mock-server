var faker = require('faker');
var path = require('path');

module.exports = (app, db) => {

    app.route('/company')
        .get(function (req, res) {
            res.status(200).send(db.get('company').value());
        })
        .put(function (req, res) {
            db.set('company', req.body).write();
            res.status(200).send();
        });

    app.route('/svgChart')
        .get(function (req, res) {
            res.setHeader('Content-Type', 'image/svg+xml');
            res.status(200).sendFile(path.join(__dirname, '../files/budgetChartTemplate.svg'));
        });
};