var faker = require('faker');

module.exports = (app, db) => {

    app.route('/company')
        .get(function (req, res) {
            res.status(200).send(db.get('company').value());
        })
        .put(function (req, res) {
            db.set('company', req.body).write();
            res.status(200).send();
        });
};