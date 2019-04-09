const mysql = require('mysql');
const path = require('path');
const logger = require(path.resolve(__dirname, '../Log/Log.js'));
const name = "Database";
var config;
try {
  config = require(path.resolve(__dirname, '../Config/database'));
} catch (error) {
  logger.error('Unable to load database.js in ~/Server/Utilites/Config/database.js!');
  logger.error();
  logger.error('database.js.dummy is the template, copy that, name it database.js');
  logger.error('and replace the dummy data with database credentials.  Ask Will if');
  logger.error('you have any questions.');
}

var pool = mysql.createPool(config.user_db_config);

module.exports = {
  getConnection: function (callback) {
    pool.getConnection(function(err, connection) {
      logger.log('Getting mysql pool connection...');
      callback(err, connection);
    });
  }
};
