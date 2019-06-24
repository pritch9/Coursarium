const mysql = require('mysql');
const path = require('path');
const logger = require(path.resolve(__dirname, '../Log/Log.js'));

let config;
try {
  config = require(path.resolve(__dirname, '../Config/database')).user_db_config;
} catch (error) {
  logger.error('Unable to load database.js in ~/Server/Utilites/Config/database.js!');
  logger.error();
  logger.error('database.js.dummy is the template, copy that, name it database.js');
  logger.error('and replace the dummy data with database credentials.  Ask Will if');
  logger.error('you have any questions.');
}

module.exports = require('knex')({
  client: 'mysql',
  connection: config,
  pool: {
    min: 0,
    max: 100
  }
});
