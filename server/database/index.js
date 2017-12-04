const Knex = require("knex");

const config = require("../config");

const {database, user, password, host} = config.MYSQL;

const knex = Knex({
    client: "mysql",
    connection: config.MYSQL
    // debug: true
});

console.log("Connected to MySQL");

module.exports.Queues = require("./queues")(knex);
