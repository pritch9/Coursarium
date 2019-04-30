const path = require('path');
const nodemailer = require('nodemailer');
const Email = require('email-templates');

const logger = require(path.resolve(__dirname, '../Log/Log'));
const userRepo = require(path.resolve(__dirname, '../../../Repository/UserRepository/UserRepository'));

const name = "Mail";
const debug = process.env.NODE_ENV !== 'production' || false;

var exports = module.exports = {
  sendRegistrationEmail,
  sendForgotPasswordEmail
};

const emailFiles = {
  verifyEmail: path.resolve(__dirname, '../../../emails/Templates/VerifyEmail'),
  forgotPassword: path.resolve(__dirname, '../../../emails/Templates/VerifyEmail')
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

async function sendEmail(transport, template) {
  transport.sendMail(template, (err, info) => {
    if (err) {
      logger.log(name, err);
      return;
    }
    logger.log(JSON.stringify(info.envelope));
  });
}

function sendRegistrationEmail(recipient) {
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
    const token = user.token | 'not-a-real-token';
    if (environment.production) {
      templates.verifyEmail.send({
        template: emailFiles.verifyEmail,
        message: {
          to: recipient
        },
        locals: {
          first_name: user.First_Name,
          last_name: user.Last_Name,
          school_name: user.School_Name,
          token: token,
          school_logo_location: user.School_Logo_Location
        }
      }).catch(err => logger.error(name, err));
    } else {
      logger.log('Verify \'' + recipient + '\' at http://localhost:4200/verify/' + token);
    }

  }).catch(err => logger.error(name, err));
}

function sendForgotPasswordEmail(recipient, user_id, token) {
  if(!recipient) {
    logger.error(name, 'Invalid recipient: \'' + recipient + '\'.  Failed to send forgot password email');
    return;
  }

  if (!debug) {
    templates.verifyEmail.send({
      template: emailFiles.verifyEmail,
      message: {
        to: recipient
      },
      locals: {
        token: 'not-a-real-token'
      }
    }).catch(err => logger.error(name, err));
  } else {
    logger.log('Forgot Password for \'' + recipient + '\' at http://localhost:4200/password-reset/' + user_id + '/' + token);
  }
}