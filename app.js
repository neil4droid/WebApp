var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();

//favicon
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());

app.use("/js", express.static(path.join(__dirname, 'public', 'js')));
app.use("/css", express.static(path.join(__dirname, 'public', 'css')));
app.use("/libs", express.static(path.join(__dirname, 'public', 'libs')));
app.use("/img", express.static(path.join(__dirname, 'public', 'img')));
app.use("/fonts", express.static(path.join(__dirname, 'public', 'fonts')));
app.use("/components", express.static(path.join(__dirname, 'public', 'components')));

app.get('/',function(req, res, next){
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
})
app.all("/*", function(req, res, next) {
    res.redirect("/")
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
