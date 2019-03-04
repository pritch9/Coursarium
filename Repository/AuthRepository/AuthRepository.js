const mysql = require('mysql');
const logger = require('../../Server/Utilities/Log/Log.js');
var config;
try {
  config = require('../../Server/Utilities/Config/database.js');
} catch (error) {
  logger.log('Unable to load database.js in ~/Server/Utilites/Config/database.js!');
  logger.log();
  logger.log('database.js.dummy is the template, copy that, name it database.js');
  logger.log('and replace the dummy data with database credentials.  Ask Will if');
  logger.log('you have any questions.');
}
/*
  Repository Layer: User.js
 */

var exports = module.exports = {};

const con = mysql.createConnection(config.user_db_config, (err) => {
  if (err) throw err;
});
/*
  UserInfo is any non-sensitive data.  Depending on how we want to handle this,
  we can just allow users to see other professors UserInfo, not other students.

  UserInfo:
    - id: UserRepository's ID
    - school: School of UserRepository
    - first_name: UserRepository's first name
    - Last_name: UserRepository's last name
    - full_name: 'last_name, first_name'
    - nick_name: 'may not be set'
    - avi: Link to UserRepository's avatar picture
 */
/**
 * Creates a new user entry in Users table
 * @param school_id
 * @param email
 * @param password
 * @param salt
 * @param first_name
 * @param last_name
 * @param full_name
 * @returns {Promise<any>}
 */
exports.createNewUser = function (school_id, email, password, salt, first_name, last_name, full_name) {
  const sql = "INSERT INTO `ClassHub-Development`.`Users` (school_id, email, password, salt, first_name, last_name, full_name) VALUES (?, ?, ?, ?, ?, ?, ?);";

  return new Promise((resolve, reject) => {
    con.query(sql, [school_id, email, password, salt, first_name, last_name, full_name], function (err, result) {
      if (err) reject(err);
      resolve(result[0]);
    });
  });
};

exports.getAuthenticationInfoByUserEmail = function (email) {
  // returns user_id, password_hash
};

// Setting SID
// UPDATE `ClassHub-Development`.`Users` SET session_id = ? WHERE email = ?

exports.getSessionIdByUserId = function(user_id) {
  const sql = "SELECT sid FROM `ClassHub-Development`.`Users` WHERE id = ?";

  return new Promise((resolve, reject) => {
    con.query(sql, [user_id], (err, result) => {
      if (err) reject(err);
      logger.log("Result: ");
      console.log(result);
      resolve(result);
    });
  });
};
