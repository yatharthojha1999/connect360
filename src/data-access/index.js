const {mysqlDatabaseConnection} = require('../config/docker');
const mysqlPackage = require('mysql2/promise');

const mysqlConnection = mysqlPackage.createPool({
    host: mysqlDatabaseConnection.host,
    user: mysqlDatabaseConnection.username,
    password: mysqlDatabaseConnection.password,
    database: mysqlDatabaseConnection.database,
});

const makeUsersDb = require('./users.db');
const usersDb = makeUsersDb({mysql: mysqlConnection});

module.exports = {
    usersDb,
};