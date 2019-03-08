const repo = require('../../Repository/UserRepository/UserRepository.js');
const auth = require('../../Repository/AuthRepository/AuthRepository.js');
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
  if(school === null){
    res.send({code: 5})
  }
  if(email === null){
    res.send({code: 6})
  }
  if(password === null){
    res.send({code: 7})
  }
  if(first_name === null){
    res.send({code: 8})
  }
  if(last_name === null){
    res.send({code: 9})
  }
  full_name = req.body.last_name + ', ' + req.body.first_name;


  // Validate fields here

  // school is a number > 0
  const numberRegExp = new RegExp('/\d+/g');
  if(typeof school !== "number") {
    // res.send("School validation failed");
    res.send({ code: 1 });
  }
    // email is a valid email address format max length is 120
  var buf = "@buffalo.edu";
  if(!email.includes(buf)) {
    res.send({ code: 2 });
  }
    // password is a string, we can figure out strength. Check password length, must have numbers, symbols, and a capital.
    // Pattern: (?=^.{8,100}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$
    //Description: Requires 1 lowercase, 1 uppercase, 1 digit, and 1 special character. Minimum length: 8.
  const passRegExp = new RegExp('(?=^.{8,100}$)(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;\'?/&gt;.&lt;,])(?!.*\\s).*$');
  if(!password.match(passRegExp)) {
    res.send({ code: 3 });
  }
    // firstname, last name, full name just letter characters /([A-Za-z]|\ )*/g max length for first and last is 51
  if(full_name.length > 51) {
    // res.send("Name is too long.");
    res.send({ code: 4 })
  }

  // Hash password
  var salt = '1234567890123456';
  password = bcrypt.hashSync(password, bcrypt.genSaltSync(12));

  repo.createNewUser(school, email, password, salt, first_name, last_name, full_name).then(() => {
    res.send({ code: 0 });
  });
};

exports.login = function(req, res) {
  // get authentication info
  auth.getAuthenticationInfoByUserEmail(req.body.email).then((response) => {
    // response.password
    // response.id
    if (bcrypt.compareSync(req.body.password, response.password)){
      // password matches
      const id = auth.generateSessionId();
      res.send({sessionId: id});
    } else {
      res.send({code: 1});
    }
  });
  // check password
  // if password is valid
  //   => create and set new session id (char 64)
  //   => return session id
  // else
  //   => return error code
};
