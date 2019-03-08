const repo = require('../../Repository/UserRepository/UserRepository.js');
const auth = require('../../Repository/AuthRepository/AuthRepository.js');
const logger = require('../../Server/Utilities/Log/Log.js');
const bcrypt = require('bcrypt');

var exports = module.exports = {};

exports.registerRoutes = function(app) {
  logger.logRoute('/auth/register');
  app.post('/auth/register', this.register);
  app.post('/auth/login', this.login);
  app.post('/auth/authenticate', this.authenticate);
};

exports.register = function(req, res) {
  // get fields
  var school, email, password, first_name, last_name, full_name;

  console.log('values: ');
  console.log(JSON.stringify(req.body));

  school = req.body.school;
  email = req.body.email;
  password = req.body.password;
  first_name = req.body.first_name;
  last_name = req.body.last_name;
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
  if(first_name.length > 50) {
    // res.send("Name is too long.");
    res.send({ code: 4 })
  }
  if( last_name.length > 50) {
    res.send({ code: 5 });
  }

  // Hash password
  password = bcrypt.hashSync(password, bcrypt.genSaltSync(12));

  auth.createNewUser(school, email, password, first_name, last_name, full_name).then(() => {
    console.log('Registration successful!');
    res.send({ code: 0 });
  }).catch((error) => {
    console.log('Registration failed: ' + error.code);
    res.send({ code: error.errno });
  });
};

exports.login = function(req, res) {
  // get authentication info

  auth.getAuthenticationInfoByUserEmail(req.body.email).then((response) => {
    // response.password
    // response.id
    if (bcrypt.compareSync(req.body.password, response.password)){
      // password matches
      const id = auth.generateSessionId(response.id);
      res.send({ session_id: id,
                  code: 0 });
    } else {
      res.send({ session_id: '', code: 1});
    }
  });
  // check password
  // if password is valid
  //   => create and set new session id (char 64)
  //   => return session id
  // else
  //   => return error code
};

exports.authenticate = function(req, res) {
  const session_id = req.body.session_id;
  const user_id = req.body.user_id;

  auth.getSessionIdByUserId(user_id).then(response => {
    console.log('authentication: ' + (session_id === response));
    res.send(session_id === response);
  });
};
