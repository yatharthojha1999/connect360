const mysqlDatabaseConnection = {
    "username": "root",
    "password": "admin",
    "database": "connect360_users",
    "host": "127.0.0.1",
    "dialect": "mysql"
};

const cockroachDatabaseConnection = {};
const botUserId = 999999;

module.exports = {
    mysqlDatabaseConnection,
    cockroachDatabaseConnection,
    botUserId,
};