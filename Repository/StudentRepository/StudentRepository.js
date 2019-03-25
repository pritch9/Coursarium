//Gets request from front, requests from repo. Sends info back to front.
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "76.180.47.89:3306",
  user: "andrew",
  password: "password",
  database: "ClassHub"
});

con.connect(function(err) {
  con.query("SELECT full_name FROM Users", function (err, result) {
    console.log(result);
    console.log(JSON.stringify(result));
  });
});
