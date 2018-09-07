var db = require("../models");
var request = require("request");



// Routes
// =============================================================
module.exports = function (app, stripe) {
    // POST route for saving a new Class
    app.post("/api/new", function (req, res) {
        console.log(req.body);
        db.form.create({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            })
            .then(function (dbPost) {
                console.log(dbPost);
                res.json(dbPost);
            });
    });

    // app.get('/paysuccess', function(req, res) {
    //     res.render('paysuccess', {
    //     })
    // })

    // app.post("/charge", (req, res) => {
    //     stripe.charges
    //       .create({
    //         amount: req.body.totalAmount,
    //         description: "Sample Charge",
    //         currency: "usd",
    //         source: req.body.stripeToken
    //       })
    //       .then(charge => {
    //         res.json(charge);
    //       })
    //       .catch(err => {
    //         throw err;
    //       });
    //   });

    // app.post("/charge", (req, res) => {
    //     let amount = 1099;
      
    //     stripe.customers.create({
    //        email: req.body.stripeEmail,
    //       source: req.body.stripeToken
    //     })
    //     .then(customer =>
    //       stripe.charges.create({
    //         amount,
    //         description: "Sample Charge",
    //            currency: "usd",
    //            customer: customer.id
    //       }))
    //     .then(charge => res.render("success.html"));
    //   });

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




    };