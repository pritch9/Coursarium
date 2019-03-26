const mysql = require('mysql');
const logger = require('../../Server/Utilities/Log/Log.js');

var exports = module.exports = {};

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
 Repository Layer: Users.js
*/

const con = mysql.createConnection(config.user_db_config, (err) => {
  if (err) throw err;
});

/** Gets current list of schools that are on ClassHub. This is used when students or professors create
 * account and have to choose the school they attend.
 *
 * @returns {Promise<any>}
 */

exports.getSchoolList = function() {
  console.log('Getting school list');
  return new Promise((resolve, reject) => {
    con.query("SELECT school.School_Name FROM School school", function (err, result) {
      if(err) reject(err);
      resolve(result);
    });
  });
};
