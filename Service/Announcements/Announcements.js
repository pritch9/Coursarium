const repo = require('../../Repository/AnnouncementsRepository/AnnouncementsRepository.js');
const logger = require('../../Server/Utilities/Log/Log.js');


var exports = module.exports = {};
// #region Route Registration
/**
 * Registers the routes for the Users.  Each route will call
 * a function when requests are received.
 * @param app Express app reference
 */
exports.registerRoutes = function(app) {
  app.post('/announcements/course', this.getAnnouncementsByCourseID);
  app.post('/announcements/user', this.getAnnouncementsByUserID);
  app.post('/announcements/create', this.createAnnouncement);

  /*logger.logRoute('/user/:id/courses');
  app.get('/user/:id/courses', this.getCoursesById);*/
};

exports.getAnnouncementsByCourseID = function(req, res) {
  res.sendStatus(404);
};

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

exports.createAnnouncement = function(req, res) {
  if (isNaN(+req.body.user_id) || isNaN(+req.body.course_id)) {
    res.send({ error: 1 }); // Bad info
    return;
  }
  repo.createNewAnnouncement(req.body.course_id, req.body.user_id, req.body.title, req.body.body, req.body.term).then(result => {
    res.send({error: result});
  }).catch(err => {
    logger.error('AnnouncementService', err);
    res.send({ error: 3 });
  });
};
