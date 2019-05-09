const logger = require('../Log/Log');

exports.reject = function(name, custom_message, err, reject) {
  logger.log('-/-/-/-/-/-/-/-< Error >-\\-\\-\\-\\-\\-\\-\\-\\-');
  logger.error(name, custom_message);
  logger.error(name, err);
  logger.log('-----------------------------------------');
  if (reject) {
    reject(err);
  }
};
