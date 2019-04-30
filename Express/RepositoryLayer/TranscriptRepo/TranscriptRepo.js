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


var gradeLetters = ['a', 'b+', 'b', 'c+', 'c', 'd', 'f', 'af', 'wf'],
  gradePoints  = [4, 3.5, 3, 2.5, 2, 1, 0, 0, 0];

function getNumCoursesToBeEntered() {
  "use strict";
  var numCourses = 0,
    input = "";

  do {
    input = prompt("Enter number of subjects?");

    if (input === null) { break; }
    if (!isNaN(input) && parseInt(input, 10) >= 0) {
      numCourses = parseInt(input, 10);
    }
  } while (true);

  return numCourses;
}
//https://gist.github.com/ranskills/2231230

function computeGPA(results) {
  "use strict";
  var gpa = 0,
    result = null,
    gradePoint = 0,
    pos = 0,
    totalGradePoints = 0,
    totalCreditHours = 0;

  for (var i = 0, j = results.length; i < j; i++) {
    result = results[i];
    gradePoint = 0;
    pos = gradeLetters.indexOf(result.grade.toLowerCase());

    if (pos >= 0) { gradePoint = gradePoints[pos]; }

    totalCreditHours += result.creditHours;
    totalGradePoints += gradePoint * result.creditHours;
  }


  gpa = (totalCreditHours === 0 ?  0 : totalGradePoints / totalCreditHours).toFixed(3);

  document.writeln("Total grade points = " + totalGradePoints);
  document.writeln("Number of hours = " + totalCreditHours);
  document.writeln("GPA = " + gpa);

  return gpa;
}

function acceptResults(numCourses){
  "use strict";
  var i = 0,
    input = "",
    results = [];

  while (i < numCourses) {
    i++;
    input = prompt("Enter Course/Grade/Hours");
    input = input.split("/");
    results.push({
      course: input[0].trim(),
      grade: input[1].trim(),
      creditHours: parseInt(input[2], 10)
    });
  }

  return results
}

function classGradeConverter(grade){
  if(grade == 'A' || grade == 'a') {
    grade = 4;
  }
  if(grade == 'A-' || grade == 'a-') {
    grade = 3.66;
  }
  if(grade == 'B+' || grade == 'b+') {
    grade = 3.33;
  }
  if(grade == 'B' || grade == 'b') {
    grade = 3.0;
  }
  if(grade == 'B-' || grade == 'b-') {
    grade = 2.66;
  }
  if(grade == 'C+' || grade == 'c+') {
    grade = 2.33;
  }
  if(grade == 'C' || grade == 'c') {
    grade = 2;
  }
  if(grade == 'C-' || grade == 'c-') {
    grade = 1.66;
  }
  if(grade == 'D+' || grade == 'd+') {
    grade = 1.33;
  }
  if(grade == 'D' || grade == 'd') {
    grade = 1.0;
  }
  if(grade == 'F' || grade == 'f') {
    grade = 0.0;
  }
  return grade;
}

function convertGradetoGPA(grades){
  var gpaSum = 0;
  gpaSum += grades.forEach(classGradeConverter());

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




