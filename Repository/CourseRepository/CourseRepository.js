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
exports.getCourseInfoById = function (course_id, user_id) {
  const sql =
    "SELECT \
      course.*, \
      professor.id AS Professor_ID, \
      professor.email AS Professor_Email, \
      professor.first_name AS Professor_First_Name, \
      professor.last_name AS Professor_Last_Name, \
      professor.full_name AS Professor_Full_Name, \
      professor.nick_name AS Professor_Nick_Name, \
      professor.avi AS Professor_AVI, \
      user_history.Course_Role AS User_Role \
    FROM \
      Course course \
      LEFT JOIN Course_History history ON\
        history.Course_ID = course.Course_ID AND \
        history.Course_Role = 'PROFESSOR' \
      LEFT JOIN Users professor ON \
        professor.id = history.Student_ID \
      LEFT JOIN Course_History user_history ON \
        user_history.Student_ID = ? AND \
        user_history.Course_ID = course.Course_ID \
    WHERE \
      course.Course_ID = ?";
  
  const error_msg = 'Unable to get course information by course id';
  return new Promise((resolve, reject) => {
    db.getConnection((err, con) => {
      if (err) {
        utils.reject(name, error_msg, err, reject);
        return;
      }
      con.query(sql, [user_id, course_id], function (err, result) {
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
            },
            user_role: result[0].User_Role
          };
          console.log(JSON.stringify(info));
          resolve(info);
        } else {
          resolve({});
        }
        con.release();
      });
    });
  });
};

exports.getFacultyByCourseID = function(course_id) {
  console.log('[CourseRepo] Getting faculty');
  const sql =
    "SELECT \
      user.id, \
      user.email, \
      user.first_name, \
      user.last_name, \
      user.full_name, \
      user.nick_name, \
      user.avi, \
      history.Course_Role AS role \
    FROM \
      Users user, \
      Course_History history \
    WHERE \
      history.Course_ID = ? AND \
      (history.Course_Role = 'PROFESSOR' OR \
      history.course_role = 'TA') AND \
      user.id = history.Student_ID";
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
  });
};

exports.getCourseInfoByUserID = function(user_id) {
  const sql =
    "SELECT \
      course.*, \
      professor.id AS Professor_ID, \
      professor.first_name AS Professor_First_Name, \
      professor.last_name AS Professor_Last_Name \
    FROM \
      Course_History history, \
      Course course\
      LEFT JOIN `Course_History` profHistory ON \
        profHistory.Course_ID = course.Course_ID AND \
        profHistory.Course_Role = 'PROFESSOR' \
      LEFT JOIN `Users` professor ON \
        profHistory.Student_ID = professor.id \
    WHERE \
      history.Student_ID = ? AND \
      course.Course_ID = history.Course_ID AND \
      course.Term = 'Spring' AND \
      course.Year = '2019' ";
  const error_msg = "Unable to get course info with user id: " + user_id;
  return new Promise((resolve, reject) => {
    db.getConnection((err, con) => {
      if (err) {
        utils.reject(name, error_msg, err, reject);
        return;
      }
      con.query(sql, [user_id], function (err, result) {
        if (err) {
          utils.reject(name, error_msg, err, reject);
          return;
        }
        let retVal = [];
        // for (Object[] row : results)
        for(let row of result) {
          const info = {
            course_id: row.Course_ID,
            school_id: row.School_ID,
            term: row.Term,
            year: row.Year,
            course_subject: row.Course_Subject,
            course_number: row.Course_Number,
            course_name: row.Course_Name,
            course_description: row.Course_Description,
            seats_available: row.Seats_Available,
            professor: {
              user_id: row.Professor_ID,
              first_name: row.Professor_First_Name,
              last_name: row.Professor_Last_Name
            }
          };
          retVal.push(info);
        }
        resolve(retVal);
        con.release();
      });
    });
  });
};


//get courses by userID
//select purple COLUMNS from Tables where logic

//getTranscriptByUser_ID
exports.getCurrentCoursesByUserID = function(user_id, term) {
  const sql = "SELECT Course.*, professor.id AS Professor_ID, professor.email AS Professor_Email, professor.first_name AS Professor_First_Name, professor.last_name AS Professor_Last_Name, professor.full_name AS Professor_Full_Name, professor.nick_name AS Professor_Nick_Name, professor.avi AS Professor_AVI FROM Course_History, Course INNER JOIN `Course_History` profHistory ON profHistory.Course_ID = Course.Course_ID AND  profHistory.Course_Role = 1 INNER JOIN `Users` professor ON profHistory.Student_ID = professor.id Where Course_History.Student_ID = user_id AND Course.Course_Term = term AND Course_History.Course_ID = Course.Course_ID" ;
  const error_msg = "Unable to get current course info with user id: " + user_id;
  return new Promise((resolve, reject) => {
    db.getConnection((err, con) => {
      if (err) {
        utils.reject(name, error_msg, err, reject);
        return;
      }
      con.query(sql, [user_id], function (err, result) {
        if (err) {
          utils.reject(name, error_msg, err, reject);
          return;
        }
        let retVal = [];
        for(let row of result) {
          const info = {
            course_id: row.Course_ID,
            school_id: row.School_ID,
            term: term,
            year: row.Year,
            course_subject: row.Course_Subject,
            course_number: row.Course_Number,
            course_name: row.Course_Name,
            course_description: row.Course_Description,
            seats_available: row.Seats_Available,
            professor: {
              user_id: row.Professor_ID,
              first_name: row.Professor_First_Name,
              last_name: row.Professor_Last_Name
            }
          };
          logger.log(JSON.stringify(info));
          retVal.push(info);
        }
        resolve(retVal);
        con.release();
      });
    });
  }).catch(err => {
    utils.reject(name, error_msg, err);
  });
};

exports.getCoursesOfProfessor = function(user_id) {
  const sql =
    'SELECT \
      course.* \
    FROM \
      `Course` course \
      LEFT JOIN Course_History history ON \
        history.Student_ID = ? AND \
        history.Course_Role = \'PROFESSOR\' \
    WHERE \
      course.Course_ID = history.Course_ID';
  const error_msg = 'Unable to collect courses of professor';
  return new Promise((resolve, reject) => {
    db.getConnection((err, con) => {
      if (err) {
        utils.reject(name, error_msg, err, reject);
        return;
      }

      con.query(sql, [user_id], (err, result) => {
        if (err) {
          utils.reject(name, error_msg, err, reject);
          return;
        }
        let retVal = [];
        for(let row of result) {
          retVal.push({
            course_id: row.Course_ID,
            school_id: row.School_ID,
            term: row.Term,
            year: row.Year,
            subject: row.Course_Subject,
            number: row.Course_Number,
            name: row.Course_Name,
            description: row.Course_Description,
            seats_available: row.Seats_Available
          });
        }
        resolve(retVal);
      });
    });
  });
};

exports.verifyCourseProfessor = function(user_id, course_id) {
  const sql = 'SELECT Course_ID FROM Course_History WHERE Student_ID = ? and Course_ID = ? AND Course_Role = \'PROFESSOR\'';
  const error_msg = 'Unable to verify course professor';
  return new Promise((resolve, reject) => {
    db.getConnection((err, con) => {
      if (err) {
        utils.reject(name, error_msg, err, reject);
        return;
      }

      con.query(sql, [user_id, course_id], (err, result) => {
        if (err) {
          utils.reject(name, error_msg, err, reject);
          return;
        }
        resolve(result.length > 0);
      });
    });
  });
};
