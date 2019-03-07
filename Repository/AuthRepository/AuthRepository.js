const mysql = require('mysql');
const logger = require('../../Server/Utilities/Log/Log');
const users = require('../UserRepository/UserRepository');
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
  Repository Layer: User.js
 */

var exports = module.exports = {};

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
 * Creates a new user entry in Users table
 * @param school_id
 * @param email
 * @param password
 * @param salt
 * @param first_name
 * @param last_name
 * @param full_name
 * @returns {Promise<any>}
 */
exports.createNewUser = function (school_id, email, password, salt, first_name, last_name, full_name) {
  const sql = "INSERT INTO `ClassHub-Development`.`Users` (school_id, email, password, salt, first_name, last_name, full_name) VALUES (?, ?, ?, ?, ?, ?, ?);";

  return new Promise((resolve, reject) => {
    con.query(sql, [school_id, email, password, salt, first_name, last_name, full_name], function (err, result) {
      if (err) reject(err);
      resolve(result[0]);
    });
  });
};

exports.testGetAuthInfo = function(email){

  const sql = "SELECT id, password FROM `ClassHub-Development`.`Users` WHERE email = ?";

  con.query(sql, [email], (err,result) => {
    if (err) throw (err);
    /*
    result: [
      {
        id: number,
        password: string
      }
    ]

    result[0].password
     */
    console.log(JSON.stringify(result));
    console.log('Id: ' + result[0].id);
    console.log('Password: ' + result[0].password);
  });
};

exports.getAuthenticationInfoByUserEmail = function (email) {
  // returns user_id, password_hash
  const sql = "SELECT id, password FROM `ClassHub-Development`.`Users` WHERE email = ?";

  return new Promise((resolve, reject) => {
    con.query(sql, [email], (err,result) => {
      if (err) reject(err);
      resolve(result[0]); // Result object
    });
  });

};

/**
 * getter and setter for new sessionID
 * @returns string session ID
 */
exports.generateSessionId = function(){
 // code used from jharaphula.com, for a random string generator

  var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
  var string_length = 64;
  var randomstring = '';

  for (var i = 0; i < string_length; i++) {
    var rnum = Math.floor(Math.random() * chars.length);
    randomstring += chars.substring(rnum, rnum + 1);
  }

  return randomstring;
};




/**
 *
 * @param email
 * @param session_id
 * compares sid with the getter function for sessionID
 * returns a duplicate ID error if failed
 * returns 0 error code if not
 *
 */
 exports.testSessionId = function(email, session_id){
  /* publickey = {
       email: User's email,
       session_id: Session token
     }
  */

  /*
    Private key: Find hash with email, verify hash matches
   */

  const sql = "SELECT session_id FROM `ClassHub-Development`.`Users` WHERE email = ?";

  return new Promise((resolve, reject) => {
    con.query(sql, [email], (err, result) => {
      if (err) reject(err);

      // logic
      return resolve(result.session_id === session_id);
    });
  });
};

exports.getAnnouncementsById = function(User_ID) {
 const course_ids = "SELECT Course_ID FROM 'ClassHub-Development'.'Course_History' WHERE User_ID = ?"; // gets course ids as array
 const course_infos = "SELECT * FROM `ClassHub-Development`.Course WHERE Course_ID IN ? AND Year = 2019 AND Term = 'SPRING'"; // gets course info from course ids
 const announcements = "SELECT * FROM 'ClassHub_Development'.'Announcements' WHERE Course_ID IN ?"; // gets announcment info from course ids
 // users.getUserInfoByID()

 return new Promise((resolve, reject) => {
   con.query(course_ids, [User_ID], (err, all_courses_taken) => {
     if (err) reject(err);

     // result is an array of courses taken by user
     con.query(course_infos, [result], (err, current_courses) => {
       if (err) reject(err);

       // result is an array of course data
       var courses_needed = [];
       for (const r in current_courses) {
         courses_needed.push(r.Course_ID);
       }

       con.query(announcements, [courses_needed], (err, raw_announcements) => {
         // all the announcements

         var users = new Set();
         /*
           announcements = [
              {
                course: {
                  id: 1,
                  course_subject: 'CSE',
                  course_number: 442,
                },
                user: {
                  id: 1,
                  first_name: 'William',
                  last_name: 'Pritchard',
                  avi: 'https://placehold.it/250x250'
                },
                user_role: 'Professor',
                date: new Date(),
                title: 'Announcement title',
                body: 'This is the announcement body'
              }
            ];
          */
         var announcements = [];
         var course = current_courses.find(x => x.Course_ID === announcement.Course_ID);
         for (let announcement in raw_announcements) {
           var user = users.find(x => x.id === announcement.User_ID);
           if(!user) {
             user = this.users.getUserById(announcement.User_ID);
             users.add(user);
           }
           announcements.push({
             user_role: 'Professor',
             date: announcement.date,
             title: announcement.Announcement_Title,
             body: announcement.Announcement_Body,
             course: {
               id: course.Course_ID,
               course_subject: course.Course_Subject,
               course_number: course.Course_Number
             },
             user: {
               id: user.id,
               first_name: user.first_name,
               last_name: user.last_name,
               avi: user.avi
             }
           });
         }

         resolve(announcements);
       }).bind(current_courses);
     }).bind(all_courses_taken);
   });
 });

 //var person = {Course_ID: course_id, User_ID : User_ID, Announcement_Title : annTitle}

 //return person;
};
exports.createNewAnnouncement= function (Course_ID, User_ID, Date, Announcement_Title, Announcement_Body, Course_Term) {
  const sql = "INSERT INTO `ClassHub-Development`.`Announcements` (Course_ID, User_ID, Date, Announcement_Title, Announcement_Body, Course_Term) VALUES (?, ?, ?, ?, ?, ?, ?);";

  return new Promise((resolve, reject) => {
    con.query(sql, [Course_ID, User_ID, Date, Announcement_Title, Announcement_Body, Course_Term], function (err, result) {
      if (err) reject(err);
      resolve(result[0]);
    });
  });
};


exports.getSessionIdByUserId = function(user_id) {
  const sql = "SELECT sid FROM `ClassHub-Development`.`Users` WHERE id = ?";

  return new Promise((resolve, reject) => {
    con.query(sql, [user_id], (err, result) => {
      if (err) reject(err);
      logger.log("Result: ");
      console.log(result);
      resolve(result);
    });
  });
};


