var Browser = require('zombie');
var expect = require('chai').expect;

var app = require('../../src/app.js');

describe('User register', function() {

	before(function() {
		var port = process.env.PORT || 3001;
		this.server = app.listen(port);
		this.browser = new Browser({ site: 'http://localhost:' + port});
	});

	describe('with invalid link:', function(){
		before(function(done) {
			this.browser.visit('/register', done);
		});

		it('should show error message when link is invalid', function(){
			var browser = this.browser;
			expect(browser.success).to.be.ok;
			expect(browser.query('.error')).to.be.ok;
			expect(browser.query('form[name=register]')).to.not.be.ok;
		});
	});

	describe('with valid link:', function(){

		beforeEach(function(done) {
			this.browser.visit('/register?email=abc@p2pappreciate.com&invitation_code=e00645dac40a6326c1b27073923517197d93f9279f0473d9baf388d45e488eab21f57a79', done);
		});

		it('should show a registration form', function(){
			var browser = this.browser;
			expect(browser.success).to.be.ok;
			expect(browser.query('form[name=register]')).to.be.ok;
		});

		it('should refuse an empty submission', function(done){
			var browser = this.browser;
			browser.pressButton('Submit').then(function(){
				expect(browser.success).to.be.ok;
				expect(browser.query('.error')).to.be.ok;
				expect(browser.text('.error')).to.equal('Please fill in completed information');
			}).then(done, done);
		});


		it('should retain email address and invitation code');

		it('should refuse partial submission');

		it('should constrain the password');

		// it('should enrypt the password');

		it('should refuse registration if email address doesn\'t match invitation code');

	});
	

	after(function(done) {
		this.server.close(done);
	});

});

