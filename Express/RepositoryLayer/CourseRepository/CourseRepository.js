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
 * @param course_id Id of the course
 * @param user_id ID of current user
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
        } else {
          if (result.length) {
            const {Course_Number, Professor_Nick_Name, Professor_Last_Name, Seats_Available, Professor_AVI, Professor_ID, User_Role, Professor_First_Name, Professor_Email, Course_Subject, Course_Name, Professor_Full_Name, Course_ID, Course_Description, School_ID} = result[0];
            let info = {
              id: Course_ID,
              school_id: School_ID,
              name: Course_Name,
              description: Course_Description,
              subject: Course_Subject,
              number: Course_Number,
              seats_available: Seats_Available,
              professor: {
                id: Professor_ID,
                school: School_ID,
                email: Professor_Email,
                first_name: Professor_First_Name,
                last_name: Professor_Last_Name,
                full_name: Professor_Full_Name,
                nick_name: Professor_Nick_Name,
                avi: Professor_AVI
              },
              user_role: User_Role
            };
            console.log(JSON.stringify(info));
            resolve(info);
          } else {
            resolve({});
          }
        }
        con.release();
      });
    });
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
