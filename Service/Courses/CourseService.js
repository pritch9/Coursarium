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
