const {Sequelize} = require('sequelize');
const {Umzug, SequelizeStorage} = require('umzug');
const {mysqlDatabaseConnection} = require('./config/docker');


const sequelize = new Sequelize({
    username: mysqlDatabaseConnection.username,
    password: mysqlDatabaseConnection.password,
    database: mysqlDatabaseConnection.database,
    dialect: mysqlDatabaseConnection.dialect,
});

const umzug = new Umzug({
  migrations: {glob: 'src/migrations/*.js'},
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({sequelize}),
  logger: console,
});

async function runMigration() {
    await umzug.up();
}

runMigration();