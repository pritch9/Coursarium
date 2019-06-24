/********************************** */
/**** Imports ********************* */
/********************************** */

const path = require('path');
const db = require(path.resolve(__dirname, '../../Server/Utilities/Database/Database'));
const utils = require(path.resolve(__dirname, '../../Server/Utilities/Utils/Utils'));


/********************************** */
/**** Constants ******************* */
/********************************** */

const name = 'SchoolRepository';


/********************************** */
/**** Functions ******************* */
/********************************** */


exports.getSchoolById = function (id) {
  return db.table('Schools')
    .select()
    .where('id', id)
    .then(rows => rows);
};

exports.getAllSchools = function () {
  return db.table('Schools').select().then(rows => [rows]);
};

exports.getSchoolsByUserId = function (user_id) {
  return db.table('School_Enrollment').select('school_id').where('user_id', user_id);
};
