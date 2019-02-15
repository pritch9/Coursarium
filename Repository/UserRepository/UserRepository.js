const mysql = require('mysql');
const config = require('../../Server/Utilities/Config/database.js');
/*
  Repository Layer: User.js
 */

var exports = module.exports = {}

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
 * Gets the User info from ID
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
  const sql = "SELECT id, email, first_name, last_name, full_name, nick_name, avi FROM `User` WHERE id = ?";

  return new Promise((resolve, reject) => {
    con.query(sql, [user_id], function (err, result) {
      if (err) reject(err);
      resolve(result[0]);
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
 * Gets the users courses by User ID
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
 * @param user_id Id of the User
 * @returns {Promise<any>} Course[] of user
 */
exports.getCoursesById = function (user_id) {
  const sql = "SELECT `Course_History`.*, `Course`.* FROM `Course_History` LEFT JOIN `Course` ON `Course_History`.`Course_ID` = `Course`.`Course_ID` WHERE `Course_History`.`Student_ID` = ?";

  return new Promise((resolve, reject) => {
    con.query(sql, [user_id], function (err, result) {
      if (err) reject(err);
      resolve(result);
    });
  });
};
