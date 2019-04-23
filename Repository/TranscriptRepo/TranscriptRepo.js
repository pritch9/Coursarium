const db = require('../../Server/Utilities/Database/Database');
const utils = require('../../Server/Utilities/Utils/Utils');
/*
  Repository Layer: Users.js
 */
const name = 'CourseRepository';
var exports = module.exports = {};
// var exports = module.exports = {};



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
 */


 exports.getTranscriptByUserID = function(user_id) {
   // const sql = "SELECT Course.* FROM Course_History, Course Where Course_History.Student_ID = user_id AND Course.Course_Term = term AND Course_History.Course_ID = Course.Course_ID " ;
   const sql = "SELECT Course.* FROM Course_History, Course WHERE Course_History.Student_ID = ? AND Course.Course_ID = Course_History.Course_ID";
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




}


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




