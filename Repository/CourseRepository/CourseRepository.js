const db = require('../../Server/Utilities/Database/Database');
const utils = require('../../Server/Utilities/Utils/Utils');
/*
  Repository Layer: Users.js
 */
const name = 'CourseRepository';
var exports = module.exports = {};
// var exports = module.exports = {};

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
  const error_msg = 'Unable to get course information by course id';

  return new Promise((resolve, reject) => {
    db.getConnection((err, con) => {
      if (err) {
        utils.reject(name, error_msg, err, reject);
        return;
      }
      con.query(sql, [course_id], function (err, result) {
        if (err) {
          utils.reject(name, error_msg, err, reject);
          return;
        }
        if (result.length) {
          let info = {
            id: result[0].Course_ID,
            name: result[0].Course_Name,
            description: result[0].Course_Description,
            subject: result[0].Course_Subject,
            number: result[0].Course_Number,
            seats_available: result[0].Seats_Available,
            professor: {
              id: result[0].Professor_ID,
              school: result[0].School_ID,
              email: result[0].Professor_Email,
              first_name: result[0].Professor_First_Name,
              last_name: result[0].Professor_Last_Name,
              full_name: result[0].Professor_Full_Name,
              nick_name: result[0].Professor_Nick_Name,
              avi: result[0].Professor_AVI
            }
          };
          console.log(JSON.stringify(info));
          resolve(info);
        } else {
          resolve({});
        }
        con.release();
      });
    });
  }).catch(err => {
    utils.reject(name, error_msg, err);
  });
};

exports.getFacultyByCourseID = function(course_id) {
  console.log('[CourseRepo] Getting faculty');
  const sql = "SELECT user.id, user.email, user.first_name, user.last_name, user.full_name, user.nick_name, user.avi, history.Course_Role AS role  " +
    "FROM Users user, Course_History history WHERE history.Course_ID = ? AND (history.Course_Role = 1 OR history.course_role = 2) " +
    "AND user.id = history.Student_ID";
  const error_msg = 'Unable to get faculty by course id';

  return new Promise((resolve, reject) => {
    db.getConnection((err, con) => {
      if (err) {
        utils.reject(name, error_msg, err, reject);
        return;
      }
      con.query(sql, [course_id], (err, result) => {
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
