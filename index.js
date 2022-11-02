var fs = require("fs");
const app = require('./src/app.js');
const pool = require('./src/pool');

const { parse } = require('./database-config/config');

var databaseIni = fs.readFileSync('./database-config/database.ini', 'utf8');
var database = parse(databaseIni).postgresql

pool.connect(database)
    .then(() => {
        app().listen(1234, () => {
            console.log('Listening on port 1234');
        });
    })
    .catch((err) => { console.error(err) });

