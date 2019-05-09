/********************************** */
/**** Imports ********************* */
/********************************** */

const path = require('path');
const repo = require(path.resolve(__dirname, '../../RepositoryLayer/SchoolRepository/SchoolRepository.js'));


/********************************** */
/**** Constants ******************* */
/********************************** */


/********************************** */
/**** Functions ******************* */
/********************************** */


/**
 * Registers the routes for the Express.  Each route will call
 * a function when requests are received.
 *
 * @param app Express app reference
 */
exports.registerRoutes = function (app) {
  app.get('/schools', this.getSchoolList);
};


/**
 * Gets current list of schools that are registered. This is used when students or professors create
 * account and have to choose the school they attend.
 *
 * @param req HTTP Request
 * @param res HTTP response
 */
exports.getSchoolList = function (req, res) {
  console.log('[service] Getting school list');
  repo.getSchoolList().then((result) => {
    res.send(result);
  }).catch(err => console.log(err));
};
