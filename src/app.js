var express = require('express');
var http = require('http');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var MongoStore = require('connect-mongo')(express);

var i18n = require('i18n');
var _ = require('./utils/underscore');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.set('layout', 'layout');
app.enable('view cache');
app.engine('html', require('hogan-express'));

i18n.configure({
    locales:['en', 'zh_CN'],
    defaultLocale: 'zh_CN',
    directory: __dirname + '/locales',
    updateFiles: false
});

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(i18n.init);
// register helper as a locals function wrapped as mustache expects
app.use(function (req, res, next) {
    // mustache helper
    // console.log(i18n.getLocale(req));
    // i18n.setLocale(req, 'zh_CN');    
    res.locals.__ = function () {
      return function (text, render) {
        return i18n.__.apply(req, arguments);
      };
    };

    next();
});


app.use(express.session({secret: '5an.9uru', store: new MongoStore({url: "mongodb://localhost/db"})}));
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req, res, next) {
    if(req.user) {
        res.locals.user = _.pick(req.user, 'email', 'name');
    }
    next();
});

app.use(app.router);
require('./routes')(app);
require('./routes/signup')(app);
require('./routes/register')(app);
require('./routes/authentication')(app);


/// error handlers

// development error handler
// will print stacktrace
// if (app.get('env') === 'development') {
//     app.use(function(err, req, res, next) {
//         res.render('error', {
//             message: err.message,
//             error: err
//         });
//     });
// }

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    console.log(err);
    console.log(err.name);

    if(err.name === "GlobalError") {
        res.render('warn', {
            message: err.message,
            error: err.errors
        });
    }
    else {
        res.render('error', {
            message: err.message,
            error: err //no stacktraces should be leaked to user
        });
    }

    // if (req.xhr) { 
    //     // res.status(err.status); 
    //     res.json({message: err.message});}

});


module.exports = app;
