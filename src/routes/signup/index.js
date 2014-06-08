var _ = require('../../utils/underscore');
var util = require('util');
var shortId = require('shortid');

var crypto = require("crypto");
var Poe = require('../../models/poe-links');
var SignUp = require('../../models/signup');
var mailer = require('../../utils/mailer');

// var errors = require('../../errors');
var mongoose = require('mongoose-q')(require('mongoose'));


module.exports = function(app) {
	
	app.get('/signup', function(req, res, next) {
        
        var poe = new Poe({
            uri: '/signup',
            guid: shortId.generate()
        });

        poe.saveQ()
        .then(function(result){
            if (req.xhr) { res.json(result); } 
            else {
                res.render('signup/index', {
                    poe_link: util.format('/signup/%s', result.guid)
                });
            }
        })
        .fail(function(err){
            return next(err);
        })
        .done();

	});


	app.post('/signup/:guid', function(req, res, next) {        
        //validate poe-link
        var poe, signup;
        Poe.findOneQ({ uri: '/signup', guid: req.params.guid, committed: false })
        .then(function(result){
            if(!result || result.committed) {
                throw new Error('400');
            } else {
                poe = result;
                return result;
            }
        })
        .then(function(poe){
            signup = new SignUp({
                email: req.body.email,
                invitation_code: shortId.generate()
            });
            return [signup.saveQ(), poe];
        })
        .spread(function(result_signup, result_poe){
            result_poe.committed = true;
            return [result_signup, result_poe.saveQ()];
        })
        .spread(function(result, result_poe){
            // sent notification email
            // console.log(result, result_poe);
            var mailto = result.email;
            var template_content = [{
                "name": "url",
                "content": "http://localhost:3000/register?email=*|email|*&invitation_code=*|invitation_code|*"
            }];
            var merger_vars = [{
                "rcpt": mailto,
                "vars": [{
                    "name": "email",
                    "content": mailto
                },
                {
                    "name": "invitation_code",
                    "content": result.invitation_code
                }]
            }];
            mailer.sendTemplate("test", template_content, merger_vars, result.email, function(){
                console.log('A mail was sent to %s successfully.', result.email);
            });
            // mailer.send('Signup Successfully', html, result.email, function(){
            //     console.log('A mail was sent to %s successfully.',result.email);
            // });
            return result;
        })
        .then(function(result){
            if (req.xhr) { res.json({message: 'success'}); } 
            else res.render('signup/success', {email: result.email}); 
        })
        .fail(function(err){
            if(err.name == 'ValidationError') {

                /******************************
                /* error instance *
                { message: 'Validation failed',
                  name: 'ValidationError',
                  errors: 
                   { email: 
                      { message: 'invalid email address...',
                        name: 'ValidatorError',
                        path: 'email',
                        type: 'user defined',
                        value: 'abc' } } }
                *********************************/

                if (req.xhr) { res.json(err.errors); }
                else 
                res.render('signup/index', {
                    errors: err.errors,
                    email: signup.email,
                    poe_link: util.format('/signup/%s', poe.guid)
                });

            } else return next(err);
        })
        .done();
    });


};
