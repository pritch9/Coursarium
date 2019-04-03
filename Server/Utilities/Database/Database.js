const mysql = require('mysql');
const logger = require('../Log/Log.js');
var config;
try {
  config = require('../Config/database');
} catch (error) {
  logger.log('Unable to load database.js in ~/Server/Utilites/Config/database.js!');
  logger.log();
  logger.log('database.js.dummy is the template, copy that, name it database.js');
  logger.log('and replace the dummy data with database credentials.  Ask Will if');
  logger.log('you have any questions.');
}

class MySQLConnection {
  static getConnection() {
    if(!MySQLConnection.con || MySQLConnection.con.state === 'disconnected') {
      console.log('Connecting...');
      MySQLConnection.con = mysql.createConnection(config.user_db_config, (err) => {
        if (err) throw err;
      });
    }
    console.log((MySQLConnection.con.state === 'disconnected') ? 'Connection disconnected!' : 'Connection connected!');
    return MySQLConnection.con;
  }
}

module.exports = MySQLConnection;
