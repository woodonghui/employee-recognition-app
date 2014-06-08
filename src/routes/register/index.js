var _ = require('../../utils/underscore');
// var crypto = require("crypto");
var signup = require('../../models/signup');
var user = require('../../models/user');

var i18n = require('i18n');
var CommonError = require('../../errors/common-error');
var GlobalError = require('../../errors/global-error');

var Q = require('q');


module.exports = function(app) {
	
	app.get('/register', function(req, res, next) {

		Q.fcall(function(){
			if(_.isEmpty(req.query)) throw new GlobalError(404);
			return req.query;
		})
		.then(function(query){
			if(_.isEmpty(query.email) || _.isEmpty(query.invitation_code)) 
				throw new CommonError('common.register.invalidlink');
			return query;
		})
		.then(function(query){
			res.render('register/index', query);
		})
		.fail(function(err){
			if (err instanceof GlobalError) next(err);
			//TODO: handle req.xhr
			else {
				res.render('alert', {
					error: {message: res.__(err.message)}
				});
			}
		});
		
	});

	app.post('/register', function(req, res) {

		var form = {
			invitation_code: req.body.invitation_code,
			email: req.body.email,
			password: req.body.password,
			name: {
				first: req.body.name.first,
				middle: req.body.name.middle,
				last: req.body.name.last
			},
			country: req.body.country
		};

		if (!_.isEmail(form.email) || _.isSomeEmpty([form.password, form.name.first, form.name.last, form.country])) {
			
			if(req.xhr) {
				res.send(_.extend(form, {
					error: true,
					message: "Please fill in completed information."
				}));
			}
			else {
				res.render('register/index', _.extend(form, {
					error: true,
					message: "Please fill in completed information."
				}));
			}
		}
		else {
			// validate email and invitation code against signup collection
			signup.isValid(form.email, form.invitation_code, function(err, valid){
				if (err) next(err);
				else if(!valid) {
					res.render('register/index', _.extend(form, {
						error: true,
						hideform: true,
						message: "Opps! It seems like your registration link is invalid."
					}));		
				}
				else {
					var doc = new user(form);
					doc.save(function(err, saved_doc){
						if (err) next(err);
						else {
							console.log(saved_doc);
							res.redirect('/');
						}
					});
				}
			});
		}

		// res.render('register/index', req.body);
	});

};