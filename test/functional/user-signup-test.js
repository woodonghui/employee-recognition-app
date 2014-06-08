var Browser = require('zombie');
var expect = require('chai').expect;

var app = require('../../src/app.js');

describe('Anonymous user sign up:', function() {
	before(function() {
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
			expect(browser.location.pathname).to.equal('/signup');
			expect(browser.text('.error')).to.equal('Please fill in your email address.');
		}).then(done, done);

	});

	it('should refuse invalid email and retain the input', function(done) {
		var browser = this.browser;
		browser.fill('email', 'abc@');
		browser.pressButton('Submit').then(function(err){
			expect(browser.success).to.be.ok;
			expect(browser.location.pathname).to.equal('/signup');
			expect(browser.text('.error')).to.equal('Invalid email address.');
			expect(browser.field('email').value).to.equal('abc@');
		}).then(done, done);
	});

	it('should refuse email under invalid domains', function(done) {
		var browser = this.browser;
		browser.fill('email', 'donghui.wu@gmail.com');
		browser.pressButton('Submit').then(function(err) {
			expect(browser.success).to.be.ok;
			expect(browser.query('.error')).to.be.ok;
			expect(browser.text('.error')).to.equal('Sorry, you are not eligible for this programme.');
		}).then(done, done);
	});

	it('should refuse email has been registered', function(done) {
		var browser = this.browser;
		browser.fill('email', 'woo.donghui@p2pappreciate.com');
		browser.pressButton('Submit').then(function(err) {
			expect(browser.success).to.be.ok;
			expect(browser.query('.error')).to.be.ok;
			expect(browser.text('.error')).to.contain('Sorry, the email address has already been registered.');
		}).then(done, done);
	});

	it('should accept valid submissions', function(done) {
		var browser = this.browser;
		browser.fill('email', 'abc@p2pappreciate.com');
		browser.pressButton('Submit').then(function(err) {
			expect(browser.success).to.be.ok;
			// expect(browser.location.pathname).to.equal('/signup/success');
			// expect success message, message text should contain email address
			expect(browser.query('.success')).to.be.ok;
			expect(browser.text('.success')).to.contain('abc@p2pappreciate.com');
		}).then(done, done);
	});

	after(function(done) {
		this.server.close(done);
	});

});

