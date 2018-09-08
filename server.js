const dotenv = require("dotenv")

const envfile =
 process.env.NODE_ENV === "production"
   ? ".env" // production
   : ".dev.env"; // development
dotenv.config({
 silent: true,
 path: `${__dirname}/${envfile}`
});

const publicKey= process.env.PUBLIC_KEY
const secretKey= process.env.SECRET_KEY


const express = require("express");
const stripe = require("stripe")(secretKey);
const bodyParser = require("body-parser");

// Tells node that we are creating an "express" server
const app = express();

const PORT = process.env.PORT || 3000;

const db = require("./app/models");
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

// =============================================================================
// LISTENER
// =============================================================================

db.sequelize.sync({}).then(function () {
  console.log("db synced...");

app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
});