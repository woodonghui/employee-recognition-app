var Browser = require('zombie');
var expect = require('chai').expect;

var app = require('../../src/app.js');

describe('User login:', function() {
	before(function() {
		var port = process.env.PORT || 3001;
		this.server = app.listen(port);
		this.browser = new Browser({ site: 'http://localhost:' + port});
	});

	beforeEach(function(done) {
		this.browser.visit('/login', done);
	});

	it('should display login form');

	it('should refuse empty submission');

	it('should refuse partical submission');

	it('should display alert message when credential is incorrect');

	it('should accept login with correct credential');

};