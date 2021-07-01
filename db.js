const { POSTGRES_PORT, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_HOST } = require('./config');
const Sequelize = require('sequelize');
//const { PG_CONNECTION_STRING } = require('./config');
//const sequelize = new Sequelize(PG_CONNECTION_STRING);
const sequelize = new Sequelize('test', 'postgres', '123456', {
    host: 'db',
    port: '5432',
    dialect: 'postgres'
})

const User = require('./models/user')(sequelize, Sequelize);
const Game = require('./models/game')(sequelize, Sequelize);

sequelize
    .authenticate()
    .then(() => {
        console.log("Connection has been established successfully.");
    })
    .catch(err => {
        console.error("Unable to connect to the database:", err);
    });

module.exports = { sequelize, User, Game };