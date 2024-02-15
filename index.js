var express = require('express');
var app = express();
app.post('/', function (req, res) {
    res.send('Hello World');
});
app.get('/', function (req, res) {
});
app.patch('/', function (req, res) {
});
var port = process.env.PORT || 5000;
app.listen(port, function () {
    console.log("Server started on localhost:".concat(port));
});
