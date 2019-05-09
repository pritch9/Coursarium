const emailVerification = require('email-validator');
const path = require('path');

const db = require(path.resolve(__dirname, '../../Server/Utilities/Database/Database'));
const utils = require(path.resolve(__dirname, '../../Server/Utilities/Utils/Utils'));
const logger = require(path.resolve(__dirname, '../../Server/Utilities/Log/Log'));
/*
  Repository Layer: Users.js
 */
const name = 'UserRepository';

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
 * Gets the Users info from ID
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
 * @param user_id
 * @returns {Promise<UserInfo>}
 */
exports.getUserById = function (user_id) {
  // Check if user_id is id number or email
  const tcheck = +user_id;
  let sql = "SELECT id, email, first_name, last_name, full_name, nick_name, avi FROM `Users` WHERE id = ?";
  if (isNaN(tcheck)) {
    if (!emailVerification.validate(user_id)) {
      return Promise.resolve(null);
    }
    sql = "SELECT id, email, first_name, last_name, full_name, nick_name, avi FROM `Users` WHERE email = ?";
  }
  logger.log('getting user ' + user_id);
  const error_msg = 'Unable to get user info by id';
  return new Promise((resolve, reject) => {
    db.getConnection((err,con) => {
      if (err) {
        utils.reject(name, error_msg, err, reject);
        return;
      }
      con.query(sql, [user_id], function (err, result) {
        if (err) {
          utils.reject(name, error_msg, err, reject);
          return;
        }
        if (result.length) {
          result[0].FullUser = true;
          resolve(result[0]);
        } else {
          resolve(null);
        }
        con.release();
      });
    });
  }).catch(err => {
    utils.reject(name, error_msg, err, reject);
  });
};

/*
  Course
* id: Primary Key, reference to the course
* School Id: reference to the school.
* Semester:  (Fall | Spring | Summer | Winter)
* Subject: ****CSE**** 250, ****ECON**** 101
* Code: CSE ****442****, MTH ****411****
* Name: Course name "Intro to Economics"
* Description: "Professor entered course description (catalog?)
* Count:  Seats available (Constant)
 */
/**
 * Gets the users courses by Users ID
 *
 *   Course
 *     - id: Primary Key, reference to the course
 *     - School Id: reference to the school.
 *     - Semester:  (Fall | Spring | Summer | Winter)
 *     - Subject: ****CSE**** 250, ****ECON**** 101
 *     - Code: CSE ****442****, MTH ****411****
 *     - Name: Course name "Intro to Economics"
 *     - Description: "Professor entered course description (catalog?)
 *     - Count:  Seats available (Constant)
 *
 * @param user_id Id of the Users
 * @returns {Promise<any>} Course[] of Users
 */
exports.getCoursesById = function (user_id) {
  const sql = "SELECT `Course_History`.*, `Course`.* FROM `Course_History` CROSS JOIN `Course` ON `Course_History`.`Course_ID` = `Course`.`Course_ID` WHERE `Course_History`.`Student_ID` = ?";
  const error_msg = 'Unable to get courses by id!';

  return new Promise((resolve, reject) => {
    db.getConnection((err,con) => {
      if (err) {
        utils.reject(name, error_msg, err, reject);
        return;
      }
      con.query(sql, [user_id], function (err, result) {
        if (err) {
          utils.reject(name, error_msg, err, reject);
          return;
        }
        resolve(result);
        con.release();
      });
    });
  }).catch(err => {
    utils.reject(name, error_msg, err);
  });
};

exports.getCurrentCoursesById = function (user_id) {
  const sql = "SELECT `Course_History`.*, `Course`.* FROM `Course_History` CROSS JOIN `Course` ON `Course_History`.`Course_ID` = `Course`.`Course_ID` WHERE `Course_History`.`Student_ID` = ?";
  const error_msg = 'Unable to get users current courses by id';

  return new Promise((resolve, reject) => {
    db.getConnection((err,con) => {
      if (err) {
        utils.reject(name, error_msg, err, reject);
        return;
      }
      con.query(sql, [user_id], function (err, result) {
        if (err) {
          utils.reject(name, error_msg, err, reject);
          return;
        }
        resolve(result[0]);
        con.release();
      });
    });
  }).catch(err => {
    utils.reject(name, error_msg, err);
  });
};
/**
 * Gets the Users info from ID
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
 * @param user_id
 * @returns {Promise<UserInfo>}
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
