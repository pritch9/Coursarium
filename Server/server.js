#!/usr/bin/env node

/** imports **/
const fs = require("fs");
const http = require("http");
const https = require("https");
const path = require("path");
const logger = require(path.resolve(__dirname, './Utilities/Log/Log'));
const mail = require(path.resolve(__dirname, './Utilities/Mail/Mail'));

const privateKey = fs.readFileSync(path.resolve(__dirname, "../SSL/_.coursarium.com_private_key.key"));
const certificate = fs.readFileSync(path.resolve(__dirname, "../SSL/coursarium.com_ssl_certificate.cer"));
const debug = process.env.NODE_ENV !== 'production' || false;

if (debug) {
  logger.warn('Starting server in DEBUG mode');
} else {
  logger.warn('Starting server in PRODUCTION mode');
}

const express = require("express");
const bodyParser = require("body-parser");
const compression = require("compression");
const cors = require("cors");

/** Credentials **/
var credentials = {
  key: privateKey,
  cert: certificate
};

/** Initialize express framework **/
const app = express();


/** Register Origins **/
logger.log("Registering origins");
app.use(cors()); // Register origins using cors
app.use(compression());

const http_port = 8000,
  https_port = 443;

/** Initialize Server routes **/
logger.log("initializing routes");
app.use(bodyParser.json());  // Body parser allows us to read the request body

/** Register routes **/
require('../Service/Users/UserService').registerRoutes(app);
require('../Service/Users/Authentication').registerRoutes(app);
require('../Service/Announcements/Announcements').registerRoutes(app);
require('../Service/StudentList/StudentService').registerRoutes(app);
require('../Service/SchoolList/SchoolService').registerRoutes(app);
require('../Service/Courses/CourseService').registerRoutes(app);
require('../Repository/AuthRepository/AuthRepository').testGetAuthInfo('example@example.com');


logger.log('Registering * route');
app.all('*', send404);
logger.log();
logger.log();
logger.log('Routes registered:');
app._router.stack.forEach(function(r){
  if (r.route && r.route.path){
    logger.log('\t\t' + r.route.path)
  }
});
logger.log();
logger.log();

app.all('*', function(req, res, next) {
  res.header('access-control-allow-headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  if (req.method === 'OPTIONS') {
    //respond with 200
    res.sendStatus(200);
  } else {
    next();
  }
});

if(debug) {
  let httpServer = http.createServer(app);
  httpServer.listen(http_port);
  logger.log("HTTP - STARTED > Port " + http_port);
} else {
  let httpsServer = https.createServer(credentials, app);
  httpsServer.listen(https_port);
  logger.log("HTTPS - STARTED > Port " + https_port);
}

function send404(req, res) {
  logger.warn("404 error");
  logger.log('[404] Headers: ' + JSON.stringify(req.header));
  logger.log('[404] Body: ' + JSON.stringify(req.body));
  res.sendStatus(404);
}
