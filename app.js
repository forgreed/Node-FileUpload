var fs = require('fs');
var path = require('path');
var express = require('express');
var busboy = require('connect-busboy');
var jade = require('jade');
var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(busboy());

app.use('/', require('./routes/index'));

app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: err
    });
});

module.exports = app;