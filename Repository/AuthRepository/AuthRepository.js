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
  const sql = "SELECT id, password, salt FROM `ClassHub-Development`.`Users` WHERE email = ?";

  return new Promise((resolve, reject) => {

    con.query(sql, [email], (err,result) => {
      if (err) reject(err);
      /*
      result: [
        {
          id: number,
          password: string
        }
      ]

      result[0].password
       */
      // console.log(JSON.stringify(result));
      resolve(result);
    });

    con.query(sql, [password], (err,result) => {
      if (err) reject(err);
      logger.log("Result: ");
      console.log(result);
      resolve(result);
    });
  });

};

/**
 * getter and setter for new sessionID
 * @returns string session ID
 */
function generateSessionId(){

 // code used from jharaphula.com, for a random string generator

  var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
  var string_length = 6;
  var randomstring = '';

  for (var i = 0; i < string_length; i++) {
    var rnum = Math.floor(Math.random() * chars.length);
    randomstring += chars.substring(rnum, rnum + 1);
  }

  return randomstring;
}





/**
 *
 * @param sid
 * compares sid with the getter function for sessionID
 * returns a duplicate ID error if failed
 * returns 0 error code if not
 *
 */
function testSessionId(publicKey, privateKey){
  if(generateSessionId()!= privateKey) {
    error : 1088
    //error for a duplicate email or ID
  }
  if(generateSessionId() == privateKey){
    error : 0
    //return error 0 for a matching sessionID
  }
};

 function getCurrentCoursesById(User_ID) {
   const course_id = "SELECT Course_ID FROM 'ClassHub-Development'.'Course_History' WHERE User_ID = ?, Course_Term = Spring2019";
   const annTitle = "SELECT * FROM 'ClassHub_Development'.'Announcements' WHERE Course_ID = course_id, Course_Term = Spring2019";



   var person = {Course_ID: course_id, User_ID : User_ID, Announcement_Title : annTitle}

   return person;
 }
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


