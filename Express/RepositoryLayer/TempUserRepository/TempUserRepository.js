/********************************** */
/**** Imports ********************* */

/********************************** */

const path = require('path');
const db = require(path.resolve(__dirname, '../../Server/Utilities/Database/Database'));
const utils = require(path.resolve(__dirname, '../../Server/Utilities/Utils/Utils'));
const schoolRepo = require(path.resolve(__dirname, '../SchoolRepository/SchoolRepository'));
/********************************** */
/**** Constants ******************* */
/********************************** */

const name = 'TempUserRepo';
const Errors = {
  "TMI": new Error('Error while creating temp user, too much information!'),
  "1062": new Error('Email address is already in use!'),
  default: new Error('Unknown error!  Please bear with us, we are working hard to fix this!')
};


/********************************** */
/**** Functions ******************* */
/********************************** */

exports.createTempUser = function (data) {
  if (data.length !== 1) {
    return Promise.reject(Errors.TMI);
  }
  data = data[0];
  const token = '12345678901235678901234567890123456789012345678901234567890';
  return new Promise((resolve, reject) => {
    db.table('Users').select('id').where('email', data.email).then(rows => {
      db.table('Temp_Users').insert({email: data.email, school_id: data.school_id, token: token})
        .then(() => {
          resolve([{email: data.email, school_id: data.school_id, token}]);
        })
        .catch(err => {
          let error = Errors[err.errno];
          reject((error) ? error : Errors.default);
        });
    });
  });
};
