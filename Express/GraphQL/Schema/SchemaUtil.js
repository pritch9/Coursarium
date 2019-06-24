let path = require('path');
let fs = require('fs');
let logger = require(path.resolve(__dirname, '../../Server/Utilities/Log/Log'));

let modelPath = path.resolve(__dirname, 'Models');
let schema = {};

for (let dir of fs.readdirSync(modelPath)) {
  try {
    schema[dir] = require(modelPath + '/' + dir + '/' + dir);
  } catch (e) {
    logger.error('Unable to load GraphQL object: ' + dir);
    continue;
  }
  logger.log('GraphQL [' + dir + '] loaded.');
}

module.exports = schema;
