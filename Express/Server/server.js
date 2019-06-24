#!/usr/bin/env node

/** imports **/
const fs = require("fs");
const http = require("http");
const https = require("https");
const path = require("path");
const logger = require(path.resolve(__dirname, './Utilities/Log/Log'));
const graphqlHTTP = require('express-graphql');
// const mail = require(path.resolve(__dirname, './Utilities/Mail/Mail'));

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

/** GraphQL **/
const schema = require(path.resolve(__dirname, '../GraphQL/Schema/Schema.js'));
const {loaders} = require(path.resolve(__dirname, '../GraphQL/Schema/LoaderMap/LoaderMap.js'));

if(debug) {
  app.use('/api', graphqlHTTP({
    schema: schema,
    graphiql: true,
    context: {loaders}
  }));

  app.listen(http_port, () => logger.log('HTTP - Started (PORT: ' + http_port + ')'));
} else {
  app.use('/api', graphqlHTTP({
    schema: schema,
    graphiql: true,
    context: {loaders}
  }));
  https.createServer({
    key: privateKey,
    cert: certificate
  }, app).listen(https_port, () => logger.log('HTTPS - Started (PORT: ' + https_port + ')'));
}

function send404(req, res) {
  logger.warn("404 error");
  logger.warn('Request: ' + req.url);
  logger.log('[404] Headers: ' + JSON.stringify(req.header));
  logger.log('[404] Body: ' + JSON.stringify(req.body));
  res.sendStatus(404);
}
