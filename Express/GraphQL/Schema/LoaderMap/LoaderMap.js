/** Imports **/
let DataLoader = require('dataloader/index');
let path = require('path');
let fs = require('fs');
const logger = require(path.resolve(__dirname, '../../../Server/Utilities/Log/Log'));

/** Repository Files **/
let context = {};

const repoRegExp = new RegExp(/([a-z]*?)(Repository)/i);
let x = fs.readdirSync(path.resolve(__dirname, '../../../RepositoryLayer/'));

logger.log();
logger.log('----------------------------------');
logger.log('Loading Repositories');
logger.log();
for (let directory of x) {
  if (repoRegExp.test(directory)) {
    let contextName = directory.replace(repoRegExp, '$1');
    try {
      context[contextName] = require(path.resolve(__dirname, '../../../RepositoryLayer/' + directory + '/' + directory));
    } catch (e) {
      logger.error('Unable to load repository [' + contextName + ']');
      continue;
    }
    logger.log('Loaded repository [' + contextName + ']');
  }
}
logger.log();
logger.log('DONE');
logger.log('----------------------------------');
logger.log();

exports.loaders = {
  /** Query **/
  // Users
  getUserById: new DataLoader(id => context.User.getUserById(id)),

  // School
  getAllSchools: new DataLoader(_ => context.School.getAllSchools()),
  getSchoolById: new DataLoader(id => context.School.getSchoolById(id)),
  getSchoolsByUserId: new DataLoader(id => context.School.getSchoolById(id)),

  // Utilites
  generatePasswordHash: new DataLoader(password => context.Auth.generatePasswordHash(password)),

  /** Mutation **/
  // Auth
  login: new DataLoader((email, password) => context.Auth.login(email, password))
};
