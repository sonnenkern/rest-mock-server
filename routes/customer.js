var faker = require('faker');

module.exports = (app, db) => {

    app.route('/customerCount')
        .get(function (req, res) {
            res.status(200).send({
                customers: db.get('customers').size()
            });
        });

    app.route('/customer/:id')
        .all(function (req, res, next) {
            let customerDB = db.get('customers').find({ id: req.params.id });
            if(!customerDB.value()) {
                res.status(404).send();
                return;
            }
            req.customerDB = customerDB;
            next();
        })
        .get(function (req, res) {
            res.status(200).send(req.customerDB.value());
        })
        .put(function (req, res) {
            req.customerDB.assign(req.body).write();
            res.status(200).send();
        })
        .delete(function (req, res) {
            db.get('customers').remove(req.customerDB.value()).write();
            res.status(200).send();
        });

    app.route('/customer')
        .post(function (req, res) {
            db.get('customers').push(req.body).write();
            res.status(200).send();
        });

    app.route('/customerAll')
        .get(function (req, res) {
            res.status(200).send(db.get('customers').value());
        });


};