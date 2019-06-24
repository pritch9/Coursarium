/********************************** */
/**** Imports ********************* */
/********************************** */

const db = require('../../Server/Utilities/Database/Database');
const utils = require('../../Server/Utilities/Utils/Utils');


/********************************** */
/**** Constants ******************* */
/********************************** */

const name = 'CourseRepository';


/********************************** */
/**** Functions ******************* */
/********************************** */


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
 * @param args GraphQL Arguments
 * @returns {Promise<any>} CourseInfo of course
 */
exports.getCourseById = function (ids) {
  if (ids != null) {
    return db.table('Courses')
      .select()
      .then(rows => ids.map(id => rows.find(x => x.id === id)));
  }
  return db.table('Courses')
    .select()
    .whereIn('id', ids)
    .then(rows => ids.map(id => rows.find(x => x.id === id)));
};

exports.getCoursesByUser = function (data) {
  return db.table('Courses')
    .select()
    .rightJoin('Course_History', function () {
      this.on('Course_History.user_id', '=', data.id)
    });
};

/**
 * Gets the faculty associated with a class.  This includes:
 *  - Professors
 *  - Teaching Assistants
 *
 * @param course_id Course ID
 * @returns {Promise<any>} List of all faculty associated with class
 */
exports.getFacultyByCourseId = function (data) {
  const {course_id} = data[0];
  console.log('[CourseRepo] Getting faculty');
  const sql =
    "SELECT \
      user.id, \
      user.email, \
      user.first_name, \
      user.last_name, \
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
        } else {
          resolve(result);
        }
        con.release();
      });
    });
  });
};

/**
 * Gets the courses a user is currently in
 *
 * @param user_id User's ID
 * @returns {Promise<any[]>} List of courses
 */
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
        } else {
          let retVal = [];
          // for (Object[] row : results)
          for (let row of result) {
            const {Course_Description, School_ID, Year, Course_Name, Professor_First_Name, Course_ID, Term, Seats_Available, Professor_Last_Name, Professor_ID, Course_Subject, Course_Number} = row;
            const info = {
              id: Course_ID,
              school_id: School_ID,
              term: Term,
              year: Year,
              subject: Course_Subject,
              number: Course_Number,
              name: Course_Name,
              description: Course_Description,
              seats_available: Seats_Available,
              professor: {
                user_id: Professor_ID,
                first_name: Professor_First_Name,
                last_name: Professor_Last_Name
              }
            };
            retVal.push(info);
          }
          resolve(retVal);
        }
        con.release();
      });
    });
  });
};


/**
 * Gets the courses where the user is a professor
 * @param user_id User's ID
 * @returns {Promise<any>} List of courses
 */
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
          const {Course_Description, School_ID, Year, Course_Name, Course_ID, Term, Seats_Available, Course_Subject, Course_Number} = row;
          retVal.push({
            id: Course_ID,
            school_id: School_ID,
            term: Term,
            year: Year,
            subject: Course_Subject,
            number: Course_Number,
            name: Course_Name,
            description: Course_Description,
            seats_available: Seats_Available
          });
        }
        resolve(retVal);
      });
    });
  });
};

/**
 * This is used to authenticate a user a professor.  User id is already verified
 *
 * @param user_id Professor's ID
 * @param course_id Course ID
 * @returns {Promise<boolean>} True if user is a professor, False if not
 */
exports.verifyCourseProfessor = function(user_id, course_id) {
  const sql =
    'SELECT \
       Course_ID \
     FROM \
       Course_History \
     WHERE \
       Student_ID = ? AND \
       Course_ID = ? AND \
       Course_Role = \'PROFESSOR\'';

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
        } else {
          resolve(result.length > 0);
        }
        con.release();
      });
    });
  });
};


/**
 * Gets a list of all students enrolled in this course
 *
 * *ordered by last name
 *
 * @param user_id Professor's ID
 * @param course_id Course ID
 * @returns {Promise<any>} List of students
 */
exports.getCourseRoster = function(user_id, course_id) {
  const sql =
    'SELECT \
      student.id, \
      student.first_name,\
      student.last_name,\
      student.avi,\
      student.email\
    FROM \
      Users student, \
      Course_History history \
    WHERE \
      history.Course_ID = ? AND \
      history.Course_Role = \'STUDENT\' AND \
      student.id = history.Student_ID \
    ORDER BY student.last_name DESC';
  const error_msg = 'Unable to load class roster!';
  return new Promise((resolve, reject) => {
    this.verifyCourseProfessor(user_id, course_id).then(verified => {
      if (verified) {
        db.getConnection((err, con) => {
          if (err) {
            utils.reject(name, error_msg, err, reject);
            return;
          }
          con.query(sql, [course_id], (err, result) => {
            if (err) {
              utils.reject(name, error_msg, err, reject);
            } else {
              resolve(result);
            }
            con.release();
          });
        });
      } else {
        utils.reject(name, error_msg, 'User is not the professor!', reject);
      }
    }).catch(err => {
      utils.reject(name, error_msg, err, reject);
    });
  });
};
