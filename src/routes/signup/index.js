var GlobalError = require('../../errors/global-error');
var _ = require('../../utils/underscore');
var util = require('util');
var shortId = require('shortid');

var PoeLink = require('../../models/poe-links');
var SignUp = require('../../models/signup');
var mailer = require('../../utils/mailer');

var mongoose = require('mongoose-q')(require('mongoose'));

module.exports = function(app) {

	/*GET /signup page*/
	app.get('/signup', function(req, res, next) {        
        PoeLink.createQ('/signup')
        .then(function(poe){
            if (req.xhr) { res.json(poe); } 
            else {
                res.render('signup/index', { poelink: poe.poelink });
            }
        })
        .fail(function(err){
            return next(err);
        })
        .done();
	});


    /*POST /signup/:poe */
	app.post('/signup/:poe', function(req, res, next) {
        PoeLink.seekQ('/signup', req.params.poe)
        .then(function(poe){
            if(!poe) throw new GlobalError('Invalid post link');
            else return poe;
        })
        .then(function(poe){
            var signup = new SignUp({
                email: req.body.email,
                invitation_code: shortId.generate()
            });
            return signup.saveQ();
        })
        .then(function(result){
            // sent notification email
            // TODO: Emit event, Event Manager to trigger the event email
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
            // console.log(err);
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
                
                PoeLink.createQ('/signup')
                .then(function(poe){
                    if (req.xhr) { res.json(poe); } //res.json(err.errors); 
                    else {
                        res.render('signup/index', {
                            errors: err.errors,
                            email: req.body.email,
                            poelink: poe.poelink
                        });
                    }
                })
                .fail(function(err){
                    return next(err);
                })
                .done();

            } else return next(err);
        })
        .done();
    });

};
