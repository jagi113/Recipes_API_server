'use strict';

var fs = require("fs");
const app = require('./src/app.js');
const pool = require('./src/pool');

const { parse } = require('./database-config/config');

var databaseIni = fs.readFileSync('./database-config/database.ini', 'utf8');
var database = parse(databaseIni).postgresql

const PORT = 2121;
//const HOST = "localhost"  http://${HOST}:
//'172.17.0.6';  - ip for bridge
//http://192.168.101.189:2121/recipes/ - for external hosts
// for running container: sudo docker run -p 2121:2121 -d recipe_api
//for building image: sudo docker build . -t recipe_api

pool.connect(database)
    .then(() => {
        app().listen(PORT, () => {
            console.log(`Running on ${PORT}`);
        });
    })
    .catch((err) => { console.error(err) });

