/********************************** */
/**** Imports ********************* */
/********************************** */

const path = require('path');
const auth = require(path.resolve(__dirname, '../../RepositoryLayer/AuthRepository/AuthRepository.js'));
const logger = require(path.resolve(__dirname, '../../Server/Utilities/Log/Log.js'));
const mail = require(path.resolve(__dirname, '../../Server/Utilities/Mail/Mail.js'));
const bcrypt = require('bcrypt');
const validator = require('email-validator/index');


/********************************** */
/**** Constants ******************* */
/********************************** */

const passwordRegExp = new RegExp('(?=^.{8,100}$)(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+}{":;\'?/>.<,])(?!.*\\s).*$');


/********************************** */
/**** Functions ******************* */
/********************************** */


/**
 * Registers the routes for the Express.  Each route will call
 * a function when requests are received.
 *
 * @param app Express app reference
 */
exports.registerRoutes = function (app) {
  app.post('/auth/register', this.register);
  app.post('/auth/login', this.login);
  app.post('/auth/logout', this.logout);
  app.post('/auth/authenticate', this.authenticate);
  app.post('/auth/forgotPassword', this.forgotPassword);
  app.post('/auth/verifyResetPassword', this.verifyForgotPassword);
  app.post('/auth/resetPassword', this.resetPassword);
};


/**
 * Registers new user
 *
 *  Request Body;
 *     - School ID
 *     - Email
 *     - Password
 *     - First Name
 *     - Last Name
 *
 * @param req HTTP Request
 * @param res HTTP Response
 */
exports.register = function (req, res) {
  let school = req.body.school,
    email = req.body.email,
    password = req.body.password,
    first_name = req.body.first_name,
    last_name = req.body.last_name;

  if (isNaN(+school) || !email || !password || !first_name || !last_name) {
    res.send({error: 1});
  }
  let full_name = last_name + ', ' + first_name;

  if (!email.includes("@buffalo.edu")) {
    res.send({error: 2});
  }

  if (!password.match(passwordRegExp)) {
    res.send({error: 3});
  }

  if (first_name.length > 50) {
    res.send({error: 4})
  }
  if (last_name.length > 50) {
    res.send({error: 5});
  }

  password = bcrypt.hashSync(password, bcrypt.genSaltSync(12));

  auth.createNewUser(school, email, password, first_name, last_name, full_name).then(() => {
    res.send({error: 0});
  }).catch(err => {
    logger.log(err.sql);
    res.send({error: err.errno});
  });
};

/**
 * Logs a user in
 *
 * Request Body:
 *   - Email
 *   - Password
 *
 * @param req HTTP Request
 * @param res HTTP Response
 */
exports.login = function (req, res) {
  let email = req.body.email,
    password = req.body.password;

  if (!email || !password) {
    res.sendStatus(403);
  }

  // get authentication info
  auth.getAuthenticationInfoByUserEmail(email).then((result) => {
    const {error: error, id: user_id, password: passhash} = result;
    if (+error === 0) {
      if (bcrypt.compareSync(password, passhash.toString("UTF-8"))) {
        const sid = auth.generateSessionId(user_id);
        const retVal = {
          session_id: sid,
          user_id: user_id,
          code: 0
        };
        res.send(retVal);
        return;
      }
    }
    res.send({
      session_id: "",
      user_id: -1,
      code: 1
    });
  }).catch(() => {
    res.sendStatus(403);
  });
};

/**
 * Authenticates a user.  Returns pass: true if user and session check out
 *
 * Request Body:
 *   - User ID
 *   - Session ID
 *
 * @param req HTTP Request
 * @param res HTTP Response
 */
exports.authenticate = function (req, res) {
  const session_id = req.body.session_id;
  const user_id = req.body.user_id;

  auth.getSessionIdByUserId(user_id).then(response => {
    if (response) {
      if (response === session_id) {
        res.send({pass: true});
        return;
      }
    }
    res.send({pass: false});
  }).catch(() => {
    res.sendStatus(403);
  });
};


/**
 * Logs out a user.  Verifies session ID before so that you can't log someone else out
 *
 * Request Body:
 *   - User ID
 *   - Session ID
 *
 * @param req HTTP Request
 * @param res HTTP Response
 */
exports.logout = function (req, res) {
  const session_id = req.body.session_id;
  const user_id = req.body.user_id;

  auth.getSessionIdByUserId(user_id).then(response => {
    const {session_id: stored_sid} = response;
    if (stored_sid) {
      if (session_id === stored_sid) {
        auth.logout(user_id);
      }
    }
  });
  res.send();
};


/**
 * Requests a password link to be emailed to a user
 *
 * Request Body:
 *  - Email
 *
 * @param req HTTP Request
 * @param res HTTP Response
 */
exports.forgotPassword = function (req, res) {
  const email = req.body.email;

  if (!validator.validate(email)) {
    res.send({
      error: false  // invalid email address
    });
    return;
  }

  auth.forgotPassword(email).then(response => {
    const {user_id, token} = response;
    if (response && token) {
      mail.sendForgotPasswordEmail(email, user_id, token);
    }
    res.send({error: false});
  }).catch(err => {
    logger.error('ForgotPassword', err);
    res.send({error: true});
  });
};


/**
 * Quick check to see if user reset-password request is authorized.
 *
 * @param req HTTP Request
 * @param res HTTP Response
 */
exports.verifyForgotPassword = function (req, res) {
  const user_id = req.body.user_id, hash = req.body.hash + "";

  if (isNaN(+user_id) || hash.length !== 30) {
    res.send({verify: false});
    return;
  }

  auth.verifyForgotPassword(user_id, hash).then(response => {
    res.send({verify: response});
  }).catch(err => {
    logger.error('ForgotPassword', err);
    res.sendStatus(500);
  });
};


/**
 * Performs a password reset
 *
 * Request Body:
 *  - User ID
 *  - Forgotten-password token
 *  - New password to replace previous
 *
 *
 * @param req HTTP Request
 * @param res HTTP Response
 */
exports.resetPassword = function (req, res) {
  const user_id = req.body.user_id,
    hash = req.body.hash,
    untouched_password = req.body.password;

  if (isNaN(+user_id) || hash.length !== 30 || !untouched_password) {
    res.send({error: 1}); // Unable to verify
    return;
  }

  if (!req.body.password.match(passwordRegExp)) {
    res.send({error: 2}); // Password is invalid
  }

  bcrypt.genSalt(12, (err, salt) => {
    if (err) {
      logger.error('ResetPassword', err);
      res.send({error: 3}); // Unable to generate new password hash
      return;
    }
    bcrypt.hash(untouched_password, salt, (err, password) => {
      if (err) {
        logger.error('ResetPassword', err);
        res.send({error: 3}); // Unable to generate new password hash
        return;
      }
      auth.resetPassword(user_id, hash, password).then(() => {
        res.send({error: 0});
      }).catch(() => {
        logger.error('ResetPassword', 'Error from repository!');
        res.send({error: 3});
      });
    });
  });
};
