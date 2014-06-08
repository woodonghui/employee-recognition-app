var mongoose = require ("mongoose");
var validate = require('mongoose-validator').validate;

emailValidator = validate({message: "invalid email address..."}, 'isEmail');

var schema = new mongoose.Schema({
	email: {type: String, trim: true, lowercase: true, required: 'Email is required!', validate: emailValidator },
	created_date: { type: Date, default: Date.now },
	invitation_code: {type: String, required: true},
	registered: {type: Boolean, default: false}
});

var model = mongoose.model('Signup', schema);

model.isValid = function isValid(email, invitation_code, callback){
	model.findOne({ email: email.trim().toLowerCase(), invitation_code: invitation_code.trim() }, function(err, doc){
		if (err) return callback(err, false);
		else if(doc){
			return callback(null, true);
		} else {
			return callback(null, false);
		}
	});
};

module.exports = model;
