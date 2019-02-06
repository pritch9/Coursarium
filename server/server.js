/** imports **/
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

/** Initialize express framework **/
const app = express();
const port = 8000;

/***
 * Server log function.  Simply outputs to console with a prefix
 * @param message Message to be sent
 */
function log(message) { console.log('[Server]' + message); }

/** Initialize server routes **/
log('initializing routes');
app.use(bodyParser.json());  // Body parser allows us to read the request body



/** Register routes **/
app.route('/test').post((request, response) => {
  log('Request: ' + request.body.message);
  response.status(200).send({ message: 'Successful' });
});
log('Route registered on \'auth/\'');


/** Register Origins **/
log('Registering origins');
const corsOptions = {
  origin: 'localhost',
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions)); // Register origins using cors



/** Listen for requests **/
app.listen(port, () => {
  log('listening on port [' + port + ']');
});
