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


/**
 * Gets current list of schools that are on Coursarium. This is used when students or professors create
 * account and have to choose the school they attend.
 *
 * @returns {Promise<any[]>} List of schools with ids and banners
 */
exports.getSchoolList = function () {
  const sql =
    "SELECT \
       school.School_ID, \
       school.School_Name, \
       school.School_Banner_Location \
     FROM \
       School school";
  const error_msg = "Unable to obtain school list";
  return new Promise((resolve, reject) => {
    db.getConnection((err, con) => {
      if (err) {
        utils.reject(name, error_msg, err, reject);
        return;
      }

      con.query(sql, function (err, result) {
        if (err) {
          utils.reject(name, error_msg, err, reject);
          con.release();
          return;
        }

        resolve(result);
        con.release();
      });
    });
  });
};
