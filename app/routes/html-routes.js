module.exports = function (app, express, path ) {

app.get("/", (req, res) =>
res.render("index.html", {publicKey}));
console.log(res);

}


