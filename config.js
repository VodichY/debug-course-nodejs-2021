require('dotenv').config();

module.exports = {
    PORT: process.env.PORT,
    PG_CONNECTION_STRING: process.env.PG_CONNECTION_STRING
};