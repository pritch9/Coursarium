/** imports **/
const fs = require('fs');
const http = require('http');
const https = require('https');
const privateKey = fs.readFileSync('SSL/Server.key', 'utf8');
const certificate = fs.readFileSync('SSL/Server.crt', 'utf8');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

/** Credentials **/
var credentials = {key: privateKey, cert: certificate};

/** Initialize express framework **/
const app = express();
const http_port = 8000,
      https_port = 8443;

/***
 * Server log function.  Simply outputs to console with a prefix
 * @param message Message to be sent
 */
function log(message) { console.log('[Server] ' + message); }

/** Initialize Server routes **/
log('initializing routes');
app.use(bodyParser.json());  // Body parser allows us to read the request body


/** Register routes **/
require('../Service/Users/UserService').registerRoutes(app);
require('../Service/Users/Authentication').registerRoutes(app);
require('../Service/Announcements/Announcements').registerRoutes(app);
require('../Service/StudentList/StudentService').registerRoutes(app);
require('../Service/SchoolList/SchoolService').registerRoutes(app);
require('../Service/Courses/CourseService').registerRoutes(app);
require('../Repository/AuthRepository/AuthRepository').testGetAuthInfo('example@example.com');


log('Registering * route');
app.all('*', send404);
console.log();
console.log();
log('Routes registered:');
app._router.stack.forEach(function(r){
  if (r.route && r.route.path){
    console.log('\t\t' + r.route.path)
  }
});
console.log();
console.log();

/** Register Origins **/
log('Registering origins');
const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions)); // Register origins using cors


var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

httpServer.listen(http_port);
log('HTTP - STARTED');
httpsServer.listen(https_port);
log('HTTPS - STARTED');


function send404(req, res) {
  console.log('404 error');
  res.redirect('http://localhost:4200/error');
}
