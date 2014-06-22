var _ = require('../../utils/underscore');

var User = require('../../models/user');

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

passport.serializeUser(function(user, done) {
	done(null, user.id);
});

passport.deserializeUser(function(id, done) {
	User.findById(id, function(err, user){
		if(err) { return done(err); }
		if(user) {return done(null, user); }
	});
});

passport.use(new LocalStrategy(
	{
		usernameField: 'email',
		passwordField: 'password',
	},

	function(email, password, done) {

		User.findOne({email: email}, function(err, user) {
			if (err) { return done(err); }
			if (!user) {
				return done(null, false, { message: 'Incorrect username.' });
			}
			if (!(user.password === password)) {
				return done(null, false, { message: 'Incorrect password.' });
			}
			return done(null, user);
		});
	}

));


module.exports = function(app) {
	
	app.get('/login', function(req, res, next) {
		res.render('authentication/login');
	});


	app.post('/login', function(req, res, next) {

		if (_.isEmpty(req.body.email) || _.isEmpty(req.body.password)) {
			res.render('authentication/login', {
				email: req.body.email,
				password: req.body.password,
				errors: {message: "Please input your credential."}
			});
		}
		else {
			passport.authenticate('local', function(err, user, info) {
				if (err) { return next(err); }
				if (!user) {
					// console.log(info);
					res.render('authentication/login', {
						email: req.body.email,
						password: req.body.password,
						errors: {message: info.message}
					});
				} else {
					req.logIn(user, function(err) {
						if (err) { return next(err); }
						return res.redirect('/');
					});
					// res.redirect('/');
				}

			})(req, res, next);
		}
	});


	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});


};




