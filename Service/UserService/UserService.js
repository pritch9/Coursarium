
const repo = require('../../Repository/UserRepository/UserRepository.js');
const logger = require('../../Server/Utilities/Log/Log.js');


var exports = module.exports = {};
// #region Route Registration
/**
 * Registers the routes for the UserService.  Each route will call
 * a function when requests are received.
 * @param app Express app reference
 */
exports.registerRoutes = function(app) {
  logger.logRoute('/user/:id/info');
  app.all('/user/:id/info', this.getUserById);

  logger.logRoute('/user/:id/courses');
  app.get('/user/:id/courses', this.getCoursesById);
};

/**
 *  Gets UserInfo Model from ID
 *
 *  UserInfo is any non-sensitive data.  Depending on how we want to handle this,
 *  we can just allow users to see other professors UserInfo, not other students.
 *
 *  UserInfo Fields:
 *    - id: UserRepository's ID
 *    - school: School of UserRepository
 *    - first_name: UserRepository's first name
 *    - Last_name: UserRepository's last name
 *    - full_name: 'last_name, first_name'
 *    - nick_name: 'may not be set'
 *    - avi: 'Link to UserRepository's avatar picture
 *
 * @param req Request
 * @param res Response
 * @returns UserInfo Model of User with ID
 */
exports.getUserById = function(req, res) {
  repo.getUserById(req.params.id).then((result) => {
    res.send(result);
  });
};

/**
 *  Gets User's courses by User's ID
 *
 *  CourseInfo is a compilation of all course information
 *
 * @param req Request
 * @param res Response
 * @returns CourseInfo[] for User with ID
 */
exports.getCoursesById = function(req, res) {
  repo.getCoursesById(req.params.id).then((result) => {
    res.send(result);
  });
};
