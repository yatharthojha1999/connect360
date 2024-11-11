const mysql = require('mysql');


const mysqlDatabaseConnection = {
    "username": "root",
    "password": "",
    "database": "connnect360",
    "host": "127.0.0.1",
    "dialect": "mysql"
};

const cockroachDatabaseConnection = {};


module.exports = {
    mysqlDatabaseConnection,
    cockroachDatabaseConnection,
};