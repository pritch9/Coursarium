const path = require('path');
const nodemailer = require('nodemailer');
const Email = require('email-templates');

const logger = require(path.resolve(__dirname, '../Log/Log'));
const userRepo = require(path.resolve(__dirname, '../../../RepositoryLayer/UserRepository/UserRepository'));

const name = "Mail";
const debug = process.env.NODE_ENV !== 'production' || false;

const emailFiles = {
  verifyEmail: path.resolve(__dirname, '../../../emails/Templates/VerifyEmail'),
  forgotPassword: path.resolve(__dirname, '../../../emails/Templates/ForgotPassword')
};

const addresses = {
  noreply: 'noreply@coursarium.com'
};

const transports = {
  sendmail: nodemailer.createTransport({
    sendmail: true,
    newline: 'unix',
    path: '/usr/sbin/sendmail'
  })
};

const templates = {
  verifyEmail: new Email(
    {
      message: {
        from: addresses.noreply
      },
      transport: transports.sendmail
    }),
  forgotPasswordEmail: new Email({
      message: {
        message: {
          from: addresses.noreply
        },
        transports: transports.sendmail
      }
    })
};

exports.sendEmail = async function (transport, template) {
  transport.sendMail(template, (err, info) => {
    if (err) {
      logger.log(name, err);
      return;
    }
    logger.log(JSON.stringify(info.envelope));
  });
};

exports.sendRegistrationEmail = function (recipient) {
  if (!recipient) {
    logger.error(name, 'Invalid recipient: \'' + recipient + '\'');
    return;
  }

  userRepo.getTempUserByEmail(recipient, true).then((user) => {
    if (user === null) {
      // User not applicable
      logger.error(name, 'Unable to find temp user \'' + recipient +'\'.  Failed to send registration email.');
      return;
    }
    logger.log('Sending email');
    const {School_Name, Last_Name, School_Logo_Location, First_Name, token: token1} = user;
    const token = token1 | 'not-a-real-token';
    if (!debug) {
      templates.verifyEmail.send({
        template: emailFiles.verifyEmail,
        message: {
          to: recipient
        },
        locals: {
          first_name: First_Name,
          last_name: Last_Name,
          school_name: School_Name,
          token: token,
          school_logo_location: School_Logo_Location
        }
      }).catch(err => logger.error(name, err));
    } else {
      logger.log('Verify \'' + recipient + '\' at http://localhost:4200/verify/' + token);
    }

  }).catch(err => logger.error(name, err));
};

exports.sendForgotPasswordEmail = function (recipient, user_id, token) {
  if(!recipient) {
    logger.error(name, 'Invalid recipient: \'' + recipient + '\'.  Failed to send forgot password email');
    return;
  }

  if (!debug) {
    templates.verifyEmail.send({
      template: emailFiles.forgotPassword,
      message: {
        to: recipient
      },
      locals: {
        url: 'https://coursarium.com/password-reset/' + user_id + '/' + token
      }
    }).catch(err => logger.error(name, err));
  } else {
    logger.log('Forgot Password for \'' + recipient + '\' at http://localhost:4200/password-reset/' + user_id + '/' + token);
  }
};
