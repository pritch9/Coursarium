const db = require('../../Server/Utilities/Database/Database');
const utils = require('../../Server/Utilities/Utils/Utils');
/*
  Repository Layer: Users.js
 */
const name = 'AuthRepository';
var exports = module.exports = {};
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
  const error_msg = 'Unable to create new user!';
  return new Promise((resolve, reject) => {
    db.getConnection((err, con) => {
      if (err) {
        utils.reject(name, error_msg, err, reject);
        return;
      }
      con.query(sql, [school_id, email, password, first_name, last_name, full_name], function (err, result) {
        if (err) {
          utils.reject(name, error_msg, err, reject);
          return;
        }
        if (result) {
          resolve(result[0]);
        } else {
          resolve(null);
        }
        con.release();
      });
    });
  }).catch(err => {
    utils.reject(name, error_msg, err);
  });
};

exports.testGetAuthInfo = function (email) {
  const sql = "SELECT id, password FROM `ClassHub-Development`.`Users` WHERE email = ?";
  const error_msg = 'Unable to test auth info!';
  db.getConnection((err,con) => {
    if (err) {
      utils.reject(name, error_msg, err);
      return;
    }
    con.query(sql, [email], (err, result) => {
      if (err) {
        utils.reject(name, error_msg, err);
        return;
      }

      if (result.length) {
        console.log(JSON.stringify(result));
        console.log("Id: " + result[0].id);
        console.log("Password: " + result[0].password);
      } else {
        console.log("No user: " + email);
      }

      con.release();
    });
  });
};

exports.getAuthenticationInfoByUserEmail = function (email) {
  // returns user_id, password_hash
  const sql = "SELECT id, password FROM `ClassHub-Development`.`Users` WHERE email = ?";
  const error_msg = 'Unable to get authentication information!';
  return new Promise((resolve, reject) => {
    db.getConnection((err, con) => {
      if (err) {
        utils.reject(name, error_msg, err, reject);
        return;
      }
      con.query(sql, [email], (err, result) => {
        if (err) {
          utils.reject(name, error_msg, err, reject);
          return;
        }
        if (result && result.length) {
          const retVal = result[0];
          retVal.code = 0;
          resolve(retVal); // Result object
        } else {
          resolve({code: 1});
        }
        con.release();
      });
    });
  }).catch(err => {
    utils.reject(name, error_msg, err);
  });
};

/**
 * getter and setter for new sessionID
 * @returns string session ID
 */
exports.generateSessionId = function (user_id) {
  // code used from jharaphula.com, for a random string generator

  const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
  const string_length = 64;
  let randomstring = "";

  for (var i = 0; i < string_length; i++) {
    var rnum = Math.floor(Math.random() * chars.length);
    randomstring += chars.substring(rnum, rnum + 1);
  }

  const sql = "UPDATE `ClassHub-Development`.`Users` SET session_id = ? WHERE id = ?";
  const error_msg = 'Unable to store new session id!';

  db.getConnection((err, con) => {
    if (err) {
      utils.reject(name, error_msg, err);
      return;
    }
    con.query(sql, [randomstring, user_id], (err) => {
      if (err) {
        utils.reject(name, error_msg, err);
      }
    });
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
exports.testSessionId = function (email, session_id) {
  /* publickey = {
       email: Users's email,
       session_id: Session token
     }
  */

  /*
    Private key: Find hash with email, verify hash matches
   */

  const sql = "SELECT session_id FROM `ClassHub-Development`.`Users` WHERE email = ?";
  const error_msg = 'Unable to test session id!';
  return new Promise((resolve, reject) => {
    db.getConnection((err, con) => {
      if (err) {
        utils.reject(name, error_msg, err, result);
        return;
      }
      con.query(sql, [email], (err, result) => {
        if (err) {
          utils.reject(name, error_msg, err, result);
          return;
        }
        con.release();
        // logic
        return resolve(result.session_id === session_id);
      });
    });
  }).catch(err => {
    utils.reject(name, error_msg, err, result);
  });
};

exports.getSessionIdByUserId = function (user_id) {
  const sql = "SELECT session_id FROM `ClassHub-Development`.`Users` WHERE id = ?";
  const error_msg = 'Unable to create new user!';

  return new Promise((resolve, reject) => {
    db.getConnection((err, con) => {
      if (err) {
        utils.reject(name, error_msg, err, result);
        return;
      }
      con.query(sql, [user_id], (err, result) => {
        if (err) {
          utils.reject(name, error_msg, err, result);
          return;
        }
        if (result && result.length) {
          resolve(result[0]);
        } else {
          resolve({});
        }
        con.release();
      });
    });
  }).catch(err => {
    utils.reject(name, error_msg, err, result);
  });
};

exports.logout = function (user_id) {
  const sql = "UPDATE `ClassHub-Development`.`Users` SET session_id = NULL WHERE id = ?";
  const error_msg = 'Unable to log out user!';

  db.getConnection((err, con) => {
    if (err) {
      utils.reject(name, error_msg, err);
      return;
    }
    con.query(sql, [user_id], (err) => {
      if (err) {
        utils.reject(name, error_msg, err);
        return;
      }
      con.release();
    });
  });
};
