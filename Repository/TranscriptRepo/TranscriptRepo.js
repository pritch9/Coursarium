const db = require('../../Server/Utilities/Database/Database');
const utils = require('../../Server/Utilities/Utils/Utils');
const logger = require('../../Server/Utilities/Log/Log');
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
   const sql = "SELECT Course.* , Course_History.Grade FROM Course_History, Course WHERE Course_History.Student_ID = ? AND Course.Course_ID = Course_History.Course_ID";
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
             term: row.Term,
             year: row.Year,
             course_subject: row.Course_Subject,
             course_number: row.Course_Number,
             course_name: row.Course_Name,
             course_description: row.Course_Description,
             grade: row.Grade
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


exports.gradePointAverage = function (grade){

   var sum = 0;
   var counter = 0;

   for(var i = 0; i < grade.length; i++){
    var t = grade[i];

    var g = this.classGradeConverter(t);
    sum += g;
    ++counter;
   }
  return sum/counter;
 }





