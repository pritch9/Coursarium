const repo = require('../../Repository/CourseRepository/CourseRepository');
const userRepo = require('../../Repository/UserRepository/UserRepository');
const logger = require('../../Server/Utilities/Log/Log.js');

var exports = module.exports = {};
// #region Route Registration
/**
 * Registers the routes for the Users.  Each route will call
 * a function when requests are received.
 * @param app Express app reference
 */
exports.registerRoutes = function(app) {
  logger.logRoute('/course/:id/info');
  app.get('/course/:id/info', this.getCourseInfoByID);
};

/**
 *  Gets Users's courses by Users's ID
 *
 *  CourseInfo is a compilation of all course information
 *
 * @param req Request
 * @param res Response
 * @returns CourseInfo[] for Users with ID
 */
exports.getCourseInfoByID = function(req, res) {
  console.log('[CourseService] Getting course info: ' + req.params.id);
  repo.getCourseInfoById(req.params.id).then((result) => {
    res.send(result);
    console.log('[CourseService] Result: ' + JSON.stringify(result));
  });
};
