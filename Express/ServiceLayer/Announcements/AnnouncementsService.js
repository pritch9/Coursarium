/********************************** */
/**** Imports ********************* */
/********************************** */

const path = require('path');
const repo = require(path.resolve(__dirname, '../../RepositoryLayer/AnnouncementsRepository/AnnouncementsRepository.js'));
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
  app.post('/announcements/course', this.getAnnouncementsByCourseID);
  app.post('/announcements/user', this.getAnnouncementsByUserID);
  app.post('/announcements/create', this.createAnnouncement);

  /*logger.logRoute('/user/:id/courses');
  app.get('/user/:id/courses', this.getCoursesById);*/
};


/**
 * Gets announcements by course ID
 * @param req Request
 * @param res Response
 */
exports.getAnnouncementsByCourseID = function(req, res) {
  res.sendStatus(404);
};


/**
 * Gets announcements by user ID.  Searches for all announcements in every class
 * the user is currently enrolled in
 *
 *  Request Body;
 *     - User ID
 *
 * @param req HTTP Request
 * @param res HTTP Response
 */
exports.getAnnouncementsByUserID = function(req, res) {
  if (isNaN(req.body.user_id)) {
    res.send([]);
    return;
  }
  const user_id = req.body.user_id;

  repo.getAnnouncementsById(user_id).then(result => {
    res.send(result);
  }).catch(err => {
    logger.error('AnnouncementService', err);
    res.send([]);
  });
};


/**
 * Creates a new announcement
 *
 *  Request Body;
 *     - User ID
 *     - Course ID
 *
 * @param req HTTP Request
 * @param res HTTP Response
 */
exports.createAnnouncement = function(req, res) {
  if (isNaN(+req.body.user_id) || isNaN(+req.body.course_id)) {
    res.send({ error: 1 }); // Bad info
    return;
  }
  repo.createNewAnnouncement(req.body.course_id, req.body.user_id, req.body.title, req.body.body, req.body.term).then(result => {
    res.send(result);
  }).catch(err => {
    logger.error('AnnouncementService', err);
    res.send({ error: 3 });
  });
};
