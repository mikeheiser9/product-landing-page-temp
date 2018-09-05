var db = require("../models");
// Routes
// =============================================================
module.exports = function (app) {

    // POST route for saving a new Class
    app.post("/api/new", function (req, res) {
        console.log(req.body);
        db.form.create({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            message: req.body.message
            })
            .then(function (dbPost) {
                console.log(dbPost);
                res.json(dbPost);
            });
    });
    };