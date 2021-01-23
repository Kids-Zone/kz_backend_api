const mysql = require("mysql");
const dbConfig = require('./db');

const connection = mysql.createConnection({
  host: dbConfig.DB_HOST,
  user: dbConfig.DB_USER,
  password: dbConfig.DB_PASSWORD,
  database: dbConfig.DB_NAME,
  });

module.exports = connection;