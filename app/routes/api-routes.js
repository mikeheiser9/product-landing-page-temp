var db = require("../models");
var request = require("request");
// Routes
// =============================================================
module.exports = function (app, stripe) {

      app.get("/products/:id", function (req, res) {
        // console.log("topSpots route triggered")
        db.products.findOne({ 
            where: {
                id: req.params.id 
            }  
            })
            .then(function (data) {
                // console.log(data);
                var imageArr = data.images.split(",");
                console.log(imageArr);
                res.json(data);
                });
            });

            app.get("/reviews/:id", function (req, res) {
                db.products.findOne({ 
                    where: {
                        id: req.params.id 
                    }  
                    })
                    .then(function (rev) {
                        console.log(rev);
                        res.json(rev);
                        });
                    });

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