const mysql = require('mysql');
const logger = require('../../Server/Utilities/Log/Log');
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
  Repository Layer: Users.js
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
 * @param first_name
 * @param last_name
 * @param full_name
 * @returns {Promise<any>}
 */
exports.createNewUser = function (school_id, email, password, first_name, last_name, full_name) {
  const sql = "INSERT INTO `ClassHub-Development`.`Users` (school_id, email, password, first_name, last_name, full_name) VALUES (?, ?, ?, ?, ?, ?);";

  return new Promise((resolve, reject) => {
    con.query(sql, [school_id, email, password, first_name, last_name, full_name], function (err, result) {
      if (err) reject(err);
      if (result) {
        resolve(result[0]);
      } else {
        resolve(null);
      }
    });
  });
};

exports.testGetAuthInfo = function(email){

  const sql = "SELECT id, password FROM `ClassHub-Development`.`Users` WHERE email = ?";

  con.query(sql, [email], (err,result) => {
    if (err) throw (err);
    /*
    result: [
      {
        id: number,
        password: string
      }
    ]

    result[0].password
     */
    if (result.length) {
      console.log(JSON.stringify(result));
      console.log('Id: ' + result[0].id);
      console.log('Password: ' + result[0].password);
    } else {
      console.log('No user: ' + email);
    }
  });
};

exports.getAuthenticationInfoByUserEmail = function (email) {
  // returns user_id, password_hash
  const sql = "SELECT id, password FROM `ClassHub-Development`.`Users` WHERE email = ?";

  return new Promise((resolve, reject) => {
    con.query(sql, [email], (err,result) => {
      if (err) reject(err);
      if(result && result.length) {
        const retVal = result[0];
        retVal.code = 0;
        resolve(retVal); // Result object
      } else {
        resolve({ code: 1 });
      }
    });
  });

};

/**
 * getter and setter for new sessionID
 * @returns string session ID
 */
exports.generateSessionId = function(user_id){
 // code used from jharaphula.com, for a random string generator

  var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
  var string_length = 64;
  var randomstring = '';

  for (var i = 0; i < string_length; i++) {
    var rnum = Math.floor(Math.random() * chars.length);
    randomstring += chars.substring(rnum, rnum + 1);
  }

  const sql = 'UPDATE `ClassHub-Development`.`Users` SET session_id = ? WHERE id = ?';
  con.query(sql, [randomstring, user_id], (err) => {
    if (err) throw err;
  });
  return randomstring;
};




/**
 *
 * @param email
 * @param session_id
 * compares sid with the getter function for sessionID
 * returns a duplicate ID error if failed
 * returns 0 error code if not
 *
 */
 exports.testSessionId = function(email, session_id){
  /* publickey = {
       email: Users's email,
       session_id: Session token
     }
  */

  /*
    Private key: Find hash with email, verify hash matches
   */

  const sql = "SELECT session_id FROM `ClassHub-Development`.`Users` WHERE email = ?";

  return new Promise((resolve, reject) => {
    con.query(sql, [email], (err, result) => {
      if (err) reject(err);

      // logic
      return resolve(result.session_id === session_id);
    });
  });
};


exports.getSessionIdByUserId = function(user_id) {
  const sql = "SELECT session_id FROM `ClassHub-Development`.`Users` WHERE id = ?";

  return new Promise((resolve, reject) => {
    con.query(sql, [user_id], (err, result) => {
      if (err) reject(err);
      if (result && result.length) {
        resolve(result[0]);
      } else {
        resolve({ });
      }
    });
  }).catch(err => {
    console.log('[Get Session ID]: ' + err);
  });
};

exports.logout = function(user_id) {
  const sql = "UPDATE `ClassHub-Development`.`Users` SET session_id = NULL WHERE id = ?";
  con.query(sql, [user_id], (err) => {
    if (err) {
      logger.log('Unable to log out user ' + user_id + '.');
      logger.log('Error code: ' + err.error);
    }
    console.log('Logged out user: ' + user_id);
  });
};


