/********************************** */
/**** Imports ********************* */
/********************************** */

const path = require('path');
const db = require(path.resolve(__dirname, '../../Server/Utilities/Database/Database'));
const utils = require(path.resolve(__dirname, '../../Server/Utilities/Utils/Utils'));
const logger = require(path.resolve(__dirname, '../../Server/Utilities/Log/Log'));
const emailVerification = require('email-validator/index');


/********************************** */
/**** Constants ******************* */
/********************************** */

const name = 'UserRepository';
const Errors = {
  "TMI": new Error('Error while creating temp user, too much information!'),
  "1062": new Error(''),
  default: new Error('Unknown error!  Please bear with us, we are working hard to fix this!')
};


/********************************** */
/**** Functions ******************* */
/********************************** */


/**
 * Gets the Users info from ID
 *
 *   UserInfo:
 *     - id: UserRepository's ID
 *     - school: School of UserRepository
 *     - first_name: UserRepository's first name
 *     - Last_name: UserRepository's last name
 *     - full_name: 'last_name, first_name'
 *     - nick_name: 'may not be set'
 *     - avi: Link to UserRepository's avatar picture
 *
 * @param ids GraphQL IDs
 * @returns {Promise<any>} UserInfo of user
 */
exports.getUserById = function (data) {
  return db.table('Users')
    .select('id', 'email', 'first_name', 'last_name', 'nick_name', 'avi')
    .where(data[0])
    .then(rows => data.map(item => rows.find(x => matchWithEmailID(item, x))));
};

function matchWithEmailID(item, match) {
  for (let key of Object.keys(item)) {
    if (item[key] !== match[key]) {
      return false;
    }
  }
  return true;
}

/**
 * Gets temp user info by email
 *
 *
 *   UserInfo:
 *     - id: UserRepository's ID
 *     - school: School of UserRepository
 *     - first_name: UserRepository's first name
 *     - Last_name: UserRepository's last name
 *     - full_name: 'last_name, first_name'
 *     - nick_name: 'may not be set'
 *     - avi: Link to UserRepository's avatar picture
 *
 * @param email User's ID
 * @param withSchoolInfo Return with or without school info
 * @returns {Promise<UserInfo>} User info if temp user exists
 */
exports.getTempUserByEmail = function (email, withSchoolInfo = false) {
  // Check if user_id is id number or email
  let sql;
  if (withSchoolInfo) {
    sql = "SELECT user.email AS Email, user.first_name AS First_Name, user.last_name AS Last_Name, school.School_Name, school.School_Logo_Location  FROM `Temp_Users` user INNER JOIN `School` school on user.school_id = school.School_ID WHERE email = ?";
  } else {
    sql = "SELECT user.email AS Email, user.first_name AS First_Name, user.last_name AS Last_Name FROM `Temp_Users` user WHERE email = ?";
  }
  const error_msg = 'Unable to get temp user info by email';
  logger.log('Getting temp user...');
  return new Promise((resolve, reject) => {
    db.getConnection((err,con) => {
      if (err) {
        utils.reject(name, error_msg, err, reject);
        return;
      }
      logger.log('querying...');
      con.query(sql, [email], function (err, result) {
        if (err) {
          utils.reject(name, error_msg, err, reject);
          return;
        }
        logger.log('Got it!');
        if (result && result.length) {
          result[0].FullUser = false;
          resolve(result[0]);
        } else {
          resolve(null);
        }
        logger.log('releasing connection');
        con.release();
      });
    });
  }).catch(err => {
    utils.reject(name, error_msg, err, reject);
  });
};
