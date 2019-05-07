/********************************** */
/**** Imports ********************* */
/********************************** */

const path = require('path');
const repo = require(path.resolve(__dirname, '../../RepositoryLayer/CourseRepository/CourseRepository'));
const logger = require(path.resolve(__dirname, '../../Server/Utilities/Log/Log.js'));


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
exports.registerRoutes = function(app) {
  app.post('/course/getInfo', this.getCourseInfoByID);
  app.post('/course/getCourseInfoByUserID', this.getCourseInfoByUserID);
  app.post('/course/getFaculty', this.getFacultyByCourseID);
  app.post('/course/getCoursesOfProfessor', this.getCoursesOfProfessor);
  app.post('/course/verifyCourseProfessor', this.verifyCourseProfessor);
  app.post('/course/getRoster', this.getCourseRoster);
};

exports.getCourseInfoByID = function(req, res) {
  if(isNaN(+req.body.course_id) || isNaN(+req.body.user_id)) {
    res.send({});
    return;
  }
  repo.getCourseInfoById(req.body.course_id, req.body.user_id).then((result) => {
    res.send(result);
  }).catch(err => {
    logger.error('CourseService', err);
    res.send({});
  });
};


/**
 * Gets a user's courses
 *
 * Request Body:
 *   - User ID
 *
 * @param req HTTP Request
 * @param res HTTP Response
 */
exports.getCourseInfoByUserID = function(req, res) {
  const user_id = req.body.user_id;
  if(isNaN(+user_id)) {
    res.send([]);
    return;
  }
  repo.getCourseInfoByUserID(user_id).then((result) => {
    res.send(result);
  }).catch(err => {
    logger.error('CourseService', err);
    res.send([]);
  });
};


/**
 * Gets the faculty of a course
 *
 * Request Body:
 *   - Course ID
 *
 * @param req HTTP Request
 * @param res HTTP Response
 */
exports.getFacultyByCourseID = function(req, res) {
  if(isNaN(+req.body.course_id)) {
    res.send([]);
    return;
  }
  repo.getFacultyByCourseID(req.body.course_id).then((result) => {
    res.send(result);
  }).catch(err => {
    logger.error('CourseService', err);
    res.send([]);
  });
};

/**
 * Gets all the courses a user has the role of professor
 *
 * Request Body:
 *   - User ID
 *
 * @param req HTTP Request
 * @param res HTTP Response
 */
exports.getCoursesOfProfessor = function(req, res) {
  if (isNaN(+req.body.user_id)) {
    res.send([]);
    return;
  }
  repo.getCoursesOfProfessor(req.body.user_id).then(result => {
    res.send(result);
  }).catch(err => {
    logger.error('CourseService', err);
    res.send([]);
  });
};


/**
 * Verifies a user is the professor of a given course
 *
 * Request Body:
 *   - User ID
 *   - Course ID
 *
 * @param req HTTP Request
 * @param res HTTP Response
 */
exports.verifyCourseProfessor = function(req, res) {
  if(isNaN(+req.body.user_id) || isNaN(+req.body.course_id)) {
    res.send({});
    return;
  }
  repo.verifyCourseProfessor(req.body.user_id, req.body.course_id).then(result => {
    res.send({ verified: result });
  }).catch(err => {
    logger.error('CourseService', err);
    res.send({});
  });
};


/**
 * Provides a course roster to a user, given they are the professor of sed course
 *
 * Request Body:
 *   - User ID
 *   - Course ID
 *
 * @param req HTTP Request
 * @param res HTTP Response
 */
exports.getCourseRoster = function(req, res) {
  if (isNaN(+req.body.user_id) || isNaN(+req.body.course_id)) {
    res.send([]);
    return;
  }
  repo.getCourseRoster(req.body.user_id, req.body.course_id).then(result => {
    res.send(result);
  }).catch(err => {
    logger.error('CourseService', err);
    res.send([]);
  });
};
