
/** imports **/
const fs = require("fs");
const http = require("http");
const https = require("https");
const privateKey = fs.readFileSync("SSL/_.coursarium.com_private_key.key");
const certificate = fs.readFileSync("SSL/coursarium.com_ssl_certificate.cer");

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

/** Credentials **/
var credentials = {key: privateKey, cert: certificate};

/** Initialize express framework **/
const app = express();
const http_port = 80,
  https_port = 443;

/***
 * Server log function.  Simply outputs to console with a prefix
 * @param message Message to be sent
 */
function log(message) { console.log("[Server] " + message); }

/** Initialize Server routes **/
log("initializing routes");
app.use(bodyParser.json());  // Body parser allows us to read the request body

/** Register routes **/
require("../Service/Users/UserService").registerRoutes(app);
require("../Service/Users/Authentication").registerRoutes(app);
require("../Service/Announcements/Announcements").registerRoutes(app);
require("../Service/Courses/CourseService").registerRoutes(app);
require("../Repository/AuthRepository/AuthRepository").testGetAuthInfo("example@example.com");

log("Registering * route");
app.all("*", send404);
console.log();
console.log();
log("Routes registered:");
app._router.stack.forEach(function(r) {
  if (r.route && r.route.path) {
    console.log("\t\t" + r.route.path);
  }
});
console.log();
console.log();

/** Register Origins **/
log("Registering origins");
const corsOptions = {
  // origin: "https://coursarium.com",
  origin: '*',
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions)); // Register origins using cors

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

// httpServer.listen(http_port);
// log("HTTP - STARTED");
httpsServer.listen(https_port);
log("HTTPS - STARTED");

function send404(req, res) {
  console.log("404 error");
  res.redirect("https://coursarium/error");
}
