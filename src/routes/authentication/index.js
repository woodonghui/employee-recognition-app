var _ = require('../../utils/underscore');
// var crypto = require("crypto");
// var signup = require('../../models/signup');
var user = require('../../models/user');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;


passport.use(new LocalStrategy(
	{
		usernameField: 'email',
		passwordField: 'password',
	},
	function(email, password, done) {

		return done(null, false, {message: 'Incorrect username.' });

		// user.findOne({ email: email }, function(err, user) {
		// 	if (err) { return done(err); }
		// 	if (!user) {
		// 	return done(null, false, { message: 'Incorrect username.' });
		// 	}
		// 	if (!user.validPassword(password)) {
		// 	return done(null, false, { message: 'Incorrect password.' });
		// 	}
		// 	return done(null, user);
		// });
	}

));

module.exports = function(app) {
	
	app.get('/login', function(req, res, next) {
		res.render('authentication/login');
	});


	app.post('/login', function(req, res, next) {

		if (_.isEmpty(req.body.email) || _.isEmpty(req.body.password)) {
			res.render('authentication/login', {
				error: true,
				message: "Please input your credential."
			});
		}
		else {
			passport.authenticate('local', function(err, user, info) {
				if (err) { return next(err); }
				if (!user) {
					console.log(info);
					res.render('authentication/login', {
						error: true,
						message: info.message
					});
				}

			})(req, res, next);
		}
	});


	app.get('/logout', function(req, res, next) {
		
	});

};




