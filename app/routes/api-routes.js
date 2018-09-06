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

    app.get('/paysuccess', function(req, res) {
        res.render('paysuccess', {
        })
    })

    app.post("/charge", (req, res) => {
        stripe.charges
          .create({
            amount: req.body.totalAmount,
            description: "Sample Charge",
            currency: "usd",
            source: req.body.stripeToken
          })
          .then(charge => {
            res.json(charge);
          })
          .catch(err => {
            throw err;
          });
      });



    };