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
  logger.logRoute('/announcements/course');
  app.post('/announcements/course', this.getAnnouncementsByCourseID);

  logger.logRoute('/announcements/user');
  app.post('/announcements/user', this.getAnnouncementsByUserID);

  /*logger.logRoute('/user/:id/courses');
  app.get('/user/:id/courses', this.getCoursesById);*/
};

exports.getAnnouncementsByCourseID = function(req, res) {
  res.status(404).send();
};

exports.getAnnouncementsByUserID = function(req, res) {
  if (req.body.user_id === undefined) {
    logger.log('<GetAnnouncementsByUserID> -> Empty body!');
    res.sendStatus(500);
    return;
  }
  const user_id = req.body.user_id;

  repo.getAnnouncementsById(user_id).then(result => {
    res.send(result);
  }).catch(err => {
    logger.log('<GetAnnouncementsByUserID> -> Error: ' + err);
    res.sendStatus(500);
  });
};
