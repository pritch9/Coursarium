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
 * Gets the course info by course id
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
 * @param course_id Id of the course
 * @returns {Promise<any>} CourseInfo of course
 */
exports.getCourseInfoById = function (course_id) {
  const sql = "SELECT course.*, professor.id AS Professor_ID, professor.email AS Professor_Email, professor.first_name AS Professor_First_Name, " +
    "professor.last_name AS Professor_Last_Name, professor.full_name AS Professor_Full_Name, professor.nick_name AS Professor_Nick_Name, professor.avi AS Professor_AVI " +
    "FROM Course course, Course_History history, Users professor " +
    "WHERE course.Course_ID = ? AND history.Course_ID = course.Course_ID AND history.Course_Role = 1 AND history.Student_ID = professor.id;";

  return new Promise((resolve, reject) => {
    con.query(sql, [course_id], function (err, result) {
      if (err) reject(err);
      if (result.length) {
        let info = {
          id: result[0].Course_ID,
          subject: result[0].Course_Subject,
          number: result[0].Course_Number,
          professor: {
            id: result[0].Professor_ID,
            school: result[0].School_ID,
            email: result[0].Professor_Email,
            first_name: result[0].Professor_First_Name,
            last_name: result[0].Professor_Last_Name,
            full_name: result[0].Professor_Full_Name,
            nick_name: result[0].Professor_Nick_Name,
            avi: result[0].Professor_AVI
          },
          description: result[0].Course_Description,
          seats_available: result[0].Seats_Available
        };
        console.log(JSON.stringify(info));
        resolve(info);
      } else {
        resolve({});
      }
    });
  });
};
