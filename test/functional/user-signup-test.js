var Browser = require('zombie');
var expect = require('chai').expect;
var mongoose = require('mongoose');

var shortId = require('shortid');
var app = require('../../src/app.js');

describe('User sign up:', function() {

	before(function() {
		/* the mongodb connection has been opened in the tests of models */
		// connect mongodb test environment
		// var uristring = 'mongodb://localhost/test';
		// mongoose.connect(uristring, function (err, res) {
		//     if (err) {
		//         console.log ('ERROR connecting to: ' + uristring + '. ' + err);
		//     } else {
		//         console.log ('Succeeded connected to: ' + uristring);
		//     }
		// });

		// connect to test server
		var port = process.env.PORT || 3001;
		this.server = app.listen(port);
		this.browser = new Browser({ site: 'http://localhost:' + port});

	});

	beforeEach(function(done) {
		this.browser.visit('/signup', done);
	});

	it('should show a sign up form', function() {
		var browser = this.browser;
		expect(browser.success).to.be.ok;
		expect(browser.query('form[name=signup]')).to.be.ok;
	});

	it('should refuse an empty submission', function(done) {
		var browser = this.browser;
		browser.pressButton('Submit').then(function(err){
			expect(browser.success).to.be.ok;
			expect(browser.location.pathname).to.contain('/signup');
			expect(browser.query('.error')).to.be.ok;
		}).then(done, done);
	});

	it('should refuse invalid email and retain the input', function(done) {
		var browser = this.browser;
		browser.fill('email', 'abc@');
		browser.pressButton('Submit').then(function(err){
			expect(browser.success).to.be.ok;
			expect(browser.location.pathname).to.contain('/signup');
			expect(browser.query('.error')).to.be.ok;
			expect(browser.field('email').value).to.equal('abc@');
		}).then(done, done);
	});

	//TODO: HOW TO WRITE THE TEST CASE?
	// it('should refuse submission to invalid post url');

	// it('should refuse email under invalid domains', function(done) {
	// 	var browser = this.browser;
	// 	browser.fill('email', 'donghui.wu@gmail.com');
	// 	browser.pressButton('Submit').then(function(err) {
	// 		expect(browser.success).to.be.ok;
	// 		expect(browser.query('.error')).to.be.ok;
	// 		expect(browser.text('.error')).to.equal('Sorry, you are not eligible for this programme.');
	// 	}).then(done, done);
	// });

	// it('should refuse email has been registered', function(done) {
	// 	var browser = this.browser;
	// 	browser.fill('email', 'woo.donghui@p2pappreciate.com');
	// 	browser.pressButton('Submit').then(function(err) {
	// 		expect(browser.success).to.be.ok;
	// 		expect(browser.query('.error')).to.be.ok;
	// 		expect(browser.text('.error')).to.contain('Sorry, the email address has already been registered.');
	// 	}).then(done, done);
	// });

	it('should accept valid submission', function(done) {
		var browser = this.browser;
		browser.fill('email', 'woo.donghui@gmail.com');
		browser.pressButton('Submit').then(function(err) {
			expect(browser.success).to.be.ok;
			// expect(browser.location.pathname).to.equal('/signup/success');
			// expect success message, message text should contain email address
			expect(browser.query('.success')).to.be.ok;
			expect(browser.text('.success')).to.contain('woo.donghui@gmail.com');
		}).then(done, done);
	});

	after(function(done) {
		// mongoose.connection.close();
		this.server.close();
		done();
	});

});

