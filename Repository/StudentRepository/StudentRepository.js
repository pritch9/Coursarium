const mysql = require('mysql');
const logger = require('../../Server/Utilities/Log/Log.js');

var exports = module.exports = {};

var config;
try {
  config = require('../../Server/Utilities/Config/database.js');
} catch (error) {
  logger.log('Unable to load database.js in ~/Server/Utilities/Config/database.js!');
  logger.log();
  logger.log('database.js.dummy is the template, copy that, name it database.js');
  logger.log('and replace the dummy data with database credentials.  Ask Will if');
  logger.log('you have any questions.');
}
/*
 Repository Layer: Users.js
*/

const con = mysql.createConnection(config.user_db_config, (err) => {
  if (err) throw err;
});

/** Gets current list of students from database. This will be used to get the list of students
 * enrolled in a course.
 *
 * @returns {Promise<any>}
 */

exports.getStudentListByCourseID = function (course_id) {
  console.log('Getting student list');
  return new Promise((resolve, reject) => {
    con.query("SELECT user.full_name FROM Users user LEFT JOIN Course_History history ON history.Course_ID = ? WHERE user.id = history.Student_ID", [course_id], function (err, result) {
      if (err) reject(err);
      console.log(result);
      resolve(result);
    });
  });
};
