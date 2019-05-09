/********************************** */
/**** Imports ********************* */
/********************************** */

const db = require('../../Server/Utilities/Database/Database');
const utils = require('../../Server/Utilities/Utils/Utils');
const crypto = require('crypto');


/********************************** */
/**** Imports ********************* */
/********************************** */

const name = 'AuthRepository';


/********************************** */
/**** Functions ******************* */
/********************************** */


/**
 * Creates a user account.  Going to be changed soon to bring in email authentication.
 *
 * @param school_id ID of the school this user belongs to (verified by .edu email)
 * @param email User's login email.
 * @param password User's password (hashed with BCrypt)
 * @param first_name User's first name NOTE: Moving to user profile
 * @param last_name User's last name NOTE: Moving to user profile
 * @param full_name User's full name NOTE: Moving to user profile
 * @returns {Promise<any>} Resolves if successful, Rejects if not
 */
exports.createNewUser = function (school_id, email, password, first_name, last_name, full_name) {
  const users = "INSERT INTO Users (email, password, first_name, last_name, full_name) VALUES (?, ?, ?, ?, ?)";
  const school_enrollment = "INSERT INTO School_Enrollment (User_ID, School_ID, Primary_Role) VALUES (LAST_INSERT_ID(), ?, 'STUDENT')";
  const error_msg = 'Unable to create new user!';
  return new Promise((resolve, reject) => {
    db.getConnection((err, con) => {
      if (err) {
        utils.reject(name, error_msg, err, reject);
        return;
      }
      con.beginTransaction(function (err) {
        if (err) {
          utils.reject(name, error_msg, err, reject);
          con.rollback(() => con.release());
          return;
        }
        con.query(users, [email, password, first_name, last_name, full_name], function (err) {
          if (err) {
            utils.reject(name, error_msg, err, reject);
            con.rollback(() => con.release());
            return;
          }
          con.query(school_enrollment, school_id, function (err) {
            if (err) {
              utils.reject(name, error_msg, err, reject);
              con.rollback(() => con.release());
              return;
            }
            con.commit((err) => {
              if (err) {
                utils.reject(name, error_msg, err, reject);
                con.rollback(() => con.release());
                return;
              }
              resolve();
              con.release();
            });
          });
        });
      });
    });
  });
};


/**
 * Gets the authentication information given a user's email address
 *
 * @param email User's email address
 * @returns {Promise<any>} Returns user's ID and password hash
 */
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
          con.release();
          return;
        }
        if (result && result.length) {
          let retVal = result[0];
          retVal.error = 0;
          resolve(retVal); // Result object
        } else {
          resolve({error: 1}); // User not found
        }
        con.release();
      });
    });
  });
};


/**
 * Generates a new session ID string
 *
 * @returns string Session ID (to be stored)
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
      con.release();
    });
  });
  return randomstring;
};


/**
 * Gets a user's session ID for authentication
 *
 * @param user_id User's ID
 * @returns {Promise<string>} User's session ID
 */
exports.getSessionIdByUserId = function (user_id) {
  const sql = "SELECT session_id FROM `ClassHub-Development`.`Users` WHERE id = ?";
  const error_msg = 'Unable to create new user!';

  return new Promise((resolve, reject) => {
    db.getConnection((err, con) => {
      if (err) {
        utils.reject(name, error_msg, err, reject);
        return;
      }
      con.query(sql, [user_id], (err, result) => {
        if (err) {
          utils.reject(name, error_msg, err, reject);
          con.release();
          return;
        }
        if (result && result.length) {
          resolve(result[0].session_id);
        } else {
          resolve('');
        }
        con.release();
      });
    });
  });
};


/**
 * Logs a user out (clears session ID)
 *
 * @param user_id User's ID
 */
exports.logout = function (user_id) {
  const sql = "UPDATE `ClassHub-Development`.`Users` SET session_id = NULL WHERE id = ?";
  const error_msg = 'Unable to log out user!';

  db.getConnection((err, con) => {
    if (err) {
      utils.reject(name, error_msg, err);
      con.release();
      return;
    }
    con.query(sql, [user_id], (err) => {
      if (err) {
        utils.reject(name, error_msg, err);
      }
      con.release();
    });
  });
};


/**
 * Sends email to allow users to reset their password
 *
 * @param email User's email address
 * @returns {Promise<T | never>} Returns token and user_id for email if successful, NULL if not
 */
exports.forgotPassword = function (email) {
  const token = generateRandomTokenString();
  const sql_get_user_id = "SELECT id FROM `Users` WHERE email = ?";
  const sql = "INSERT INTO `Password_Reset` (user_id, token) VALUES (?, ?) ON DUPLICATE KEY UPDATE token = ?";
  const error_msg = 'Unable to generate forgotten password';
  return new Promise((resolve, reject) => {
    db.getConnection((err, con) => {
      if (err) {
        utils.reject(name, error_msg, err, reject);
        return;
      }
      con.query(sql_get_user_id, [email], (err, result) => {
        if (err) {
          utils.reject(name, error_msg, err, reject);
          con.release();
          return;
        }

        if (result.length) {
          const user_id = result[0].id;
          con.query(sql, [user_id, token, token], (err) => {
            if (err) {
              utils.reject(name, error_msg, err, reject);
              con.release();
              return;
            }

            resolve({
              token,
              user_id
            });
            con.release();
          });
        } else {
          resolve(null);
          con.release();
        }
      });
    });
  });
};


/**
 * Generates forgotten-password tokens
 *
 * @returns {string} Random hex string - Length: 30 characters
 */
function generateRandomTokenString() {
  return crypto.randomBytes(15).toString('hex');
}


/**
 * Verifies a user is authentic by cross referencing the user id with
 * forgotten-password token
 *
 * @param user_id ID of the user who's password is being reset
 * @param hash Token provided to verify password reset
 * @returns {Promise<boolean>} True if verified, False if not
 */
exports.verifyForgotPassword = function(user_id, hash){
  const sql = 'SELECT token FROM `Password_Reset` WHERE user_id = ?';
  const error_msg = 'Unable to verify forgotten password request';
  return new Promise((resolve, reject) => {
    db.getConnection((err, con) => {
      if (err) {
        utils.reject(name, error_msg, err, reject);
        return;
      }
      con.query(sql, [user_id], (err, result) => {
        if (err) {
          utils.reject(name, error_msg, err, reject);
          con.release();
          return;
        }
        if (!result.length) {
          resolve(false);
        } else {
          resolve(hash === result[0].token);
        }
        con.release();
      });
    });
  }).catch(err => {
    utils.reject(name, error_msg, err);
  });
};


/**
 * Resets a user's password
 *
 * @param user_id User's ID
 * @param hash Token provided to verify password reset
 * @param password New password hash
 * @returns {Promise<any>} Resolves if successful, Rejects if not
 */
exports.resetPassword = function(user_id, hash, password) {
  const sql = 'UPDATE `Users` SET password = ? WHERE id = ?';
  const sql_clear_rp = 'DELETE FROM `Password_Reset` WHERE user_id = ?';
  const error_msg = 'Unable to process change of passwords';
  return new Promise(async (resolve, reject) => {
    let verifyInfo = await this.verifyForgotPassword(user_id, hash);
    if (verifyInfo) {
      db.getConnection((err, con) => {
        if (err) {
          utils.reject(name, error_msg, err, reject);
          return;
        }
        con.query(sql, [password, user_id], (err) => {
          if (err) {
            utils.reject(name, error_msg, err, reject);
            con.release();
          } else {
            con.query(sql_clear_rp, [user_id], (err) => {
              if (err) {
                utils.reject(name, error_msg, err, reject);
              } else {
                resolve();
              }
              con.release();
            });
          }
        });
      });
    } else {
      utils.reject(name, error_msg, Error('User not verified'), reject);
    }
  });
};
