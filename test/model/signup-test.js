var expect = require('chai').expect;
var mongoose = require('mongoose');

var shortId = require('shortid');
var SignUp = require('../../src/models/signup');

describe("SignUp", function(){
	
	var signup = null;

	before(function() {
		// connect mongodb test environment
		var uristring = 'mongodb://localhost/test';
		mongoose.connect(uristring, function (err, res) {
		    if (err) {
		        console.log ('ERROR connecting to: ' + uristring + '. ' + err);
		    } else {
		        console.log ('Succeeded connected to: ' + uristring);
		    }
		});

		//TODO: prepare test db?
		//Model.remove(condition, callback);
	});

	it('model', function(done){
		signup = new SignUp({
			email: "woo.donghui@gmail.com",
			invitation_code: shortId.generate()
		});

		expect(signup).to.have.property('email');
		expect(signup).to.have.property('invitation_code');
		expect(signup).to.have.property('created_date');
		expect(signup).to.have.property('registered').to.equal(false);
		done();
	});

	it('save', function(done){
		signup.save(function(err, result){			
			expect(result).to.have.property('email').to.equal('woo.donghui@gmail.com');
			expect(result).to.have.property('invitation_code').to.equal(signup.invitation_code);
			expect(result).to.have.property('created_date');
			expect(result).to.have.property('registered').to.equal(false);
			done();	
		});
	});

	it('find by email and invitation code', function(done){
		SignUp.findOne({email: signup.email, invitation_code: signup.invitation_code}, function(err, result){
			expect(result).to.have.property('email').to.equal('woo.donghui@gmail.com');
			expect(result).to.have.property('invitation_code').to.equal(signup.invitation_code);
			expect(result).to.have.property('created_date');
			expect(result).to.have.property('registered').to.equal(false);
			done();
		});
	});

	it('refuse invalid email', function(done){
		new SignUp({email: "woo@", invitation_code: shortId.generate()})
		.save(function(err, result){
			expect(result).to.be.undefined;
			expect(err).to.have.property('name').to.equal('ValidationError');
			done();
		});
	});

	after(function(done) {
		done();
	});

});