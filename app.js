const express = require('express');
const path = require('path');
const fs=require("fs");
const app = express();
const faker = require('faker');
const config = require("./config.json");

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

//database file
const adapter = new FileSync('db.json');
const db = low(adapter);

// Set some defaults (required if your JSON file is empty)
//db.defaults({ company: {}, customers: {}, count: 0 }).write();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//CORS
/*app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});*/


//serve static files
app.use(express.static(path.join(__dirname, 'public')));

//activate EJS template engine
app.set('view engine', 'ejs');

//root route
app.get('/', (req, res) => {
    // render the `post.ejs` template with the post content
    res.render('index', getIndexParams())
});

//Routes
fs.readdirSync('./routes').forEach(function(file) {
    const route='./routes/'+file;
    require(route)(app, db);
});

//set prefix
if(config.prefix) {
    console.log("Prefix: " + config.prefix);
  app.use(config.prefix, app._router);
}

function getIndexParams() {
    let params = [];

    //get all routes with the exception of root-route
    const routes = app._router.stack.filter((r) => r.route && r.route.path !== '/').sort((a,b) => a.route.path>b.route.path);
    for(let r of routes) {
        params.push({
            path: r.route.path,
            methods: Object.keys(r.route.methods).filter((m) => m !== '_all')
        });
    }

    return {
        prefix: config.prefix,
        params: params
    };
}


module.exports = app;
