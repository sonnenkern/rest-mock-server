# rest-mock-server

Simple REST mock server on Express, Lowdb and Faker with fast configuration and less dependencies.

## Install and start

Project clone from GitHub

```
git clone https://github.com/sonnenkern/rest-mock-server.git 
```

Change to project directory `rest-mock-server` and run

```
npm install
```

Start mock server

```
npm run start
```

From that moment the server will watch for all changes in his files and automatically restart in case of any change (`nodemon`).

## Configuration

The configuration is quite simple over config.json file and has only two parameters at the moment. 

```
{
  "port": 8500,
  "prefix": "/api/v1"
}
```

## Structure of the project

```
server.js - Node.js starter
app.js - Express starter
nodemon.json - Nodemon configuration
config.json - project configuration
db.json - database file (lowdb)
db-reset.json - default database file for database reset
db-reset.js - script for database resetting

/views - folder with EJS-template for project's home page
/public - some static stuff for home page
/routes - main folder for REST mocks
```

## Home page

The home page is available at (starting with port 8500)

```
http://localhost:8500
```

![Home page image](https://raw.githubusercontent.com/sonnenkern/rest-mock-server/master/public/homepage.png)

The home page lists all available REST pathes and methods.

## Database reset

There are two ways to reset the database.

All data in db.json are replaced with data from db-reset.json.

```
npm run db-reset
```

Data for db.json will dynamically created with script (executes method initDB() from db-reset.js).

```
npm run db-reset:dynamic
```

## Usage

All mock files are placed in `routes` folder. Many mock files are supported.

Example:

```
/************* file routes/customer.js *********************/
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
```

Some variables to explain: 

* db - the data base refernce ([lowdb](https://github.com/typicode/lowdb))
* faker - Faker reference ([Faker](https://github.com/fzaninotto/Faker))


It is also possible to implement the mock methods, that don't operate with data base and just send json object back:

```
app.route('/helloWorld')
    .get(function (req, res) {
        res.status(200).send({
            message: 'Hello World!'
        });
    });
```

Request body is available over `req.body`:

```
.put(function (req, res) {
    req.customerDB.assign(req.body).write();
    res.status(200).send();
})
```

Request parameters are available over `req.params`

```
app.route('/customer/:id')
        .get(function (req, res) {
            console.log(req.params.id);
            res.status(200).send();
        })
```

Pseudo REST method `all` used for  common actions:

```
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
```

## Main dependencies

* [Express](http://expressjs.com/)- web framework for Node
* [EJS](http://ejs.co/) - template engine for home page building
* [Faker](https://github.com/marak/Faker.js/) - fake data generator
* [lowdb](https://github.com/typicode/lowdb) - small local JSON based database
* [nodemon](https://github.com/remy/nodemon) - monitor for any changes in Node application and automatically restart the server

