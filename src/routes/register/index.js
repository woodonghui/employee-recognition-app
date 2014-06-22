var _ = require('../../utils/underscore');
var Signup = require('../../models/signup');
var User = require('../../models/user');

var PoeLink = require('../../models/poe-links');

var i18n = require('i18n');
var GlobalError = require('../../errors/global-error');

var Q = require('q');
var mongoose = require('mongoose-q')(require('mongoose'));


module.exports = function(app) {
	
	/*GET /register page */
	app.get('/register', function(req, res, next) {

		Q.fcall(function(){
			if(_.isEmpty(req.query) 
				|| _.isEmpty(req.query.email) 
				|| _.isEmpty(req.query.invitation_code)) 
				throw new GlobalError("Invalid registration link");
			else
				return Signup.findOneQ({
					email: req.query.email, 
					invitation_code: req.query.invitation_code, 
					registered: false});
		})
		.then(function(signup){
            if(!signup) throw new GlobalError("Invalid registration link");
            else return signup;
        })
        .then(function(signup){
        	return [PoeLink.createQ('/register'), signup]
        })
		.spread(function(poe, signup){
			res.render('register/index', {email: signup.email, poelink: poe.poelink});
		})
		.fail(function(err){
			next(err);	
		});
	});


	app.post('/register/:poe', function(req, res, next) {
		
		// var form = {
		// 	email: req.body.email,
		// 	password: req.body.password,
		// 	name: {
		// 		first: req.body.name.first,
		// 		middle: req.body.name.middle,
		// 		last: req.body.name.last
		// 	},
		// 	country: req.body.country
		// };

		var form = req.body;

		// check whether register post link valid
		PoeLink.seekQ('/register', req.params.poe)
        .then(function(poe){
        	if(!poe) throw new GlobalError('Invalid register post link');
        	else return poe;
        })

        // check whether email already exists
        .then(function(poe){
        	if(_.isEmpty(req.body.email))
        		throw new GlobalError('Error when registration');
        	else
        		return User.ifExistQ(req.body.email);
        })

        // save user
        .then(function(result){
        	if(result) throw new GlobalError('User already exists');
        	else { 
	        	var user = new User(form);
	        	return user.saveQ();
	        }
        })

        // render view
        .then(function(user){
        	console.log(user);
        	// if (req.xhr) { res.json({message: 'success'}); } 
         	// else 
            res.render('success', {message: 'Register successfully'});
        })
        .fail(function(err){
        	// console.log(err);
        	if(err.name === 'ValidationError') {

        		PoeLink.createQ('/register')
                .then(function(poe) {
                    if (req.xhr) { res.json(poe); } //res.json(err.errors); 
                    else {
                        res.render('register/index', {
                            errors: _.parseValidationErrors(err),
                            email: req.body.email,
                            form: form,
                            poelink: poe.poelink
                        });
                    }
                })
                .fail(function(err){
                    return next(err);
                })
                .done();
			}
			else next(err);
        }).done();
		
	});

};