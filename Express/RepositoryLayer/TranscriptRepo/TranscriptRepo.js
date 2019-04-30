/********************************** */
/**** Imports ********************* */
/********************************** */

const path = require('path');
const db = require(path.resolve(__dirname, '../../Server/Utilities/Database/Database'));
const utils = require(path.resolve(__dirname, '../../Server/Utilities/Utils/Utils'));


/********************************** */
/**** Constants ******************* */
/********************************** */

const name = 'CourseRepository';


/********************************** */
/**** Functions ******************* */
/********************************** */


/**
 *  Gets Students Transcript by User ID
 *
 *   Transcript
 *     - id: Primary Key, reference to the user
 *     - School Id: reference to the school.
 *     - Semester:  (Fall | Spring | Summer | Winter)
 *     - Subject: ****CSE**** 250, ****ECON**** 101
 *     - Code: CSE ****442****, MTH ****411****
 *     - Name: Course name "Intro to Economics"
 *     - Description: "Professor entered course description (catalog?)
 *     - Grade: Grade Received in class
 *
 * @param user_id User's ID
 * @returns {Promise<any[]>} List of user's current and previous enrollments
 */
exports.getTranscriptByUserID = function (user_id) {
   // const sql = "SELECT Course.* FROM Course_History, Course Where Course_History.Student_ID = user_id AND Course.Course_Term = term AND Course_History.Course_ID = Course.Course_ID " ;
  const sql =
    "SELECT \
     course.*, \
     professor.id AS Professor_ID, \
     professor.first_name AS Professor_First_Name, \
     professor.last_name AS Professor_Last_Name\
   FROM\
     (Course course,\
     Course_History user_history,\
     Users professor)\
   LEFT JOIN \
     Course_History prof_history ON \
     prof_history.Course_ID = course.Course_ID AND \
      prof_history.Course_Role = 'PROFESSOR'\
   WHERE\
     user_history.Student_ID = 1 AND\
     course.Course_ID = user_history.Course_ID AND\
     professor.id = prof_history.Student_ID";
  const error_msg = 'Unable to get user transcript!';
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
           const {Course_Description, School_ID, Year, grade, Course_Name, Professor_First_Name, Course_ID, Term, Professor_Last_Name, Professor_ID, Course_Subject, Course_Number} = row;
           const info = {
             course_id: Course_ID,
             school_id: School_ID,
             term: Term,
             year: Year,
             course_subject: Course_Subject,
             course_number: Course_Number,
             course_name: Course_Name,
             course_description: Course_Description,
             professor: {
               user_id: Professor_ID,
               first_name: Professor_First_Name,
               last_name: Professor_Last_Name
             },
             grade: grade
           };
           retVal.push(info);
         }
         resolve(retVal);
         con.release();
       });
     });
   });
};


exports.classGradeConverter = function (grade){
  switch(grade) {
    case 'A':
      grade= 4.0;
      break;
    case 'A-':
      grade= 3.66;
      break;
    case 'B+':
      grade = 3.33;
      break;
    case 'B':
      grade= 3.0;
    break;
      case 'B-':

      grade= 2.66;
    break;
      case 'C+':

      grade= 2.33;
   break;
    case 'C':

      grade= 2.0;
   break;
    case 'C-':

      grade= 1.66;
   break;
    case 'D+':

      grade= 1.33;
    break;
      case 'D':

      grade= 1.0;
      break;
  }
return grade;
}

function convertGradetoGPA(grades){
  var gpaSum = 0;
   gpaSum  += grades.forEach(classGradeConverter())

    var gpa = gpaSum/ grades.size;


    return gpa;
  }
var grades = ['A', 'B', 'C', 'B-', 'C+'];
//console.log(classGradeConverter("B-"));

function gpaConverter(){
  var grades = ["A", "B", "C+","A", "A"];
  var gpaSum = 0;
  for(let i = 0; i < grades.length; ++i){
   gpaSum += classGradeConverter(grades[i]);

  // console.log(grades[i]);
  }
  return gpaSum/ grades.length;
}
var myGrades = ["A", "B-", "C-", "C+", "B+"]
console.log(gpaConverter(myGrades));




