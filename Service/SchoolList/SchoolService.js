const repo = require('../../Repository/SchoolRepository/SchoolRepository.js');

var exports = module.exports = {};

exports.registerRoutes = function(app) {
  app.get('/schools', this.getSchoolList);
};

/** Gets current list of schools that are on ClassHub. This is used when students or professors create
 * account and have to choose the school they attend.
 *
 * @param req
 * @param res
 */
exports.getSchoolList = function(req, res){
  console.log('[service] Getting school list');
  repo.getSchoolList().then((result) => {
    res.send(result);
  }).catch(err => console.log(err));
};
