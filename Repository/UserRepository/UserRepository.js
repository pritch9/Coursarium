const db = require('../../Server/Utilities/Database/Database');
const utils = require('../../Server/Utilities/Utils/Utils');
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
  const sql = "SELECT id, email, first_name, last_name, full_name, nick_name, avi FROM `Users` WHERE id = ?";
  console.log('getting user ' + user_id);
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
        if (result) {
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
