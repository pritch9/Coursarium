const repo = require('../../Repository/TranscriptRepo/TranscriptRepo.js');

var exports = module.exports = {};

exports.registerRoutes = function(app) {
  app.post('/getTranscript', this.getTranscript);
};

/** Gets current Transcript that is
 *  on ClassHub. This is used when students or professors create
 * account and have to choose the school they attend.
 *
 * @param req
 * @param res
 */
exports.getTranscript = function(req, res){
  const user_id = req.body.user_id;
  console.log('[service] Getting transcript');
  repo.getTranscriptByUserID(user_id).then((result) => {
    res.send(result);
  }).catch(err => console.log(err));
};
