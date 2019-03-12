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

  return new Promise((resolve, reject) => {
    con.query(sql, [user_id], function (err, result) {
      if (err) reject(err);
      if (result) {
        resolve(result[0]);
      } else {
        resolve(null);
      }
    });
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

  return new Promise((resolve, reject) => {
    con.query(sql, [user_id], function (err, result) {
      if (err) reject(err);
      resolve(result);
    });
  });
};

exports.getCurrentCoursesById = function (user_id) {
  const sql = "SELECT `Course_History`.*, `Course`.* FROM `Course_History` CROSS JOIN `Course` ON `Course_History`.`Course_ID` = `Course`.`Course_ID` WHERE `Course_History`.`Student_ID` = ?";

  return new Promise((resolve, reject) => {
    con.query(sql, [user_id], function (err, result) {
      if (err) reject(err);
      resolve(result[0]);
    });
  });
};
