const repo = require('../../Repository/StudentRepository/StudentRepository.js');

var exports = module.exports = {};

/** Gets a list of current students.
 *
 * @param req
 * @param res
 */
exports.getStudentListByCourseID = function (req, res) {
  console.log('[service] Getting student list');
  repo.getStudentListByCourseID(req.params.id).then((result) => {
    res.send(result);
  }).catch(err => console.log(err));
};


exports.registerRoutes = function (app) {
  app.get('/course/:id/roster', this.getStudentListByCourseID);
};
