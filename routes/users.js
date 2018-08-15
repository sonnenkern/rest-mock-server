module.exports = (app, db) => {

    app.route('/aaa')
        .get(function (req, res) {

            db.set('user.name', 'typicode').write();

            res.status(200).send({
                message: 'GET request successfulll!!!!'
            });
        })
        .post(function (req, res) {
            res.status(200).send({
                message: 'GET request successfulll!!!!'
            });
            console.log(req.body);
            console.log(req.body.aaa);
        });

    app.route('/bbb')
        .get(function (req, res) {
            res.status(200).send({
                message: 'BBB GET request successfulll!!!!'
            });
        });

    app.route('/ccc/:param1')
        .get(function (req, res) {
            res.status(200).send({
                message: "CCC GET request with Param1 = " + req.params.param1
            });
        });


};