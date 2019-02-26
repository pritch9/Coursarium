const repo = require('../../Repository/UserRepository/UserRepository.js');
const logger = require('../../Server/Utilities/Log/Log.js');
const bcrypt = require('bcrypt');

var exports = module.exports = {};

exports.registerRoutes = function(app) {
  logger.logRoute('/auth/register');
  app.post('/auth/register', this.register);
};

exports.register = function(req, res) {
  // get fields
  var school, email, password, first_name, last_name, full_name;

  school = req.body.school;
  email = req.body.email;
  password = req.body.password;
  first_name = req.body.first_name;
  last_name = req.body.last_name;
  full_name = req.body.last_name + ', ' + req.body.first_name;

  // Validate fields here

  // school is a number > 0
  const numberRegExp = new RegExp('/\d+/g');
  if(!school.match(numberRegExp)) {
    res.send("School validation failed");
  }
    // email is a valid email address format max length is 120
  var buf = "@buffalo.edu";
  if(!email.includes(buf)) {
    res.send("Email validation failed");
  }
    // password is a string, we can figure out strength. Check password length, must have numbers, symbols, and a capital.
    // Pattern: (?=^.{8,100}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$
    //Description: Requires 1 lowercase, 1 uppercase, 1 digit, and 1 special character. Minimum length: 8.
  const passRegExp = new RegExp('(?=^.{8,100}$)(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;\'?/&gt;.&lt;,])(?!.*\\s).*$');
  if(!password.match(passRegExp)) {
    res.send("Password validation failed");
  }
    // firstname, last name, full name just letter characters /([A-Za-z]|\ )*/g max length for first and last is 51
  if(full_name.length > 51) {
    res.send("Name is too long.");
  } else {
    res.send("All tests passed.");
  }

  // Hash password
  var salt = '0123456789012345';
  password = bcrypt.hashSync(password, salt);

  repo.register(school, email, password, salt, first_name, last_name, full_name).then((result) => {
    res.send(result);
  });
};
