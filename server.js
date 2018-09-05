var express = require("express");
var bodyParser = require("body-parser");
// Tells node that we are creating an "express" server
var app = express();
var PORT = process.env.PORT || 3000;

var db = require("./app/models")
// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("./app/public/"));

// ================================================================================
// ROUTER
// The below points our server to a series of "route" files.
// These routes give our server a "map" of how to respond when users visit or request data from various URLs.
// ================================================================================

require("./app/routes/api-routes")(app);
// require("./app/routes/html-routes")(app);
require("./app/public")(app);

// =============================================================================
// LISTENER
// The below code effectively "starts" our server
// =============================================================================

db.sequelize.sync({}).then(function () {
  console.log("db synced...");

app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
});