const pgp = require('pg-promise')({});
const {
    DATABASE,
    DATABASE_USER,
    DATABASE_PASSWORD,
    DATABASE_PORT,
    DATABASE_HOST
} = require('./index');

const dbOptions = {
    host: DATABASE_HOST,
    port: DATABASE_PORT,
    database: DATABASE,
    user: DATABASE_USER,
    password: DATABASE_PASSWORD
};

const db = pgp(dbOptions);

module.exports = db;