/********************************** */
/**** Imports ********************* */
/********************************** */

const path = require('path');
const courseRepo = require(path.resolve(__dirname, '../../RepositoryLayer/TranscriptRepo/TranscriptRepo.js'));
const userRepo = require(path.resolve(__dirname, '../../RepositoryLayer/UserRepository/UserRepository.js'));
// const logger = require(path.resolve(__dirname, '../../Server/Utilities/Log/Log.js'));


/********************************** */
/**** Constants ******************* */
/********************************** */


/********************************** */
/**** Functions ******************* */
/********************************** */


/**
 * Registers the routes for the Users.  Each route will call
 * a function when requests are received.
 * @param app Express app reference
 */
exports.registerRoutes = function (app) {
  app.post('/user/info', this.getUserById);
  app.post('/user/transcript', this.getTranscript);
};


/**
 *  Gets UserInfo Model from ID
 *
 *  UserInfo is any non-sensitive data.  Depending on how we want to handle this,
 *  we can just allow users to see other professors UserInfo, not other students.
 *
 *  Request Body:
 *    - User ID
 *
 * @param req Request
 * @param res Response
 */
exports.getUserById = function (req, res) {
  const user_id = req.body.user_id;
  if (isNaN(+user_id)) {
    res.send(null);
    return;
  }
  userRepo.getUserById(user_id).then((result) => {
    res.send(result);
  }).catch((err) => {
    logger.log('UserService', err);
    res.send(null);
  });
};


/**
 * Gets current Transcript that is on Coursarium. This is used when students or professors create
 * account and have to choose the school they attend.
 *
 * Request Body:
 *   - User ID
 *
 * @param req HTTP Request
 * @param res HTTP Response
 */
exports.getTranscript = function (req, res) {
  const user_id = req.body.user_id;
  if (isNaN(+user_id)) {
    res.send([]);
    return;
  }
  courseRepo.getTranscriptByUserID(user_id).then((result) => {
    res.send(result);
  }).catch(err => console.log(err));
};
