var mongoose = require ("mongoose");
// var Q = require("q");

var validate = require('mongoose-validator').validate;

var emailValidator = validate({message: "invalid email address..."}, 'isEmail');

var schema = new mongoose.Schema({
	email: {type: String, trim: true, lowercase: true, required: 'Email is required!', validate: emailValidator },
	created_date: { type: Date, default: Date.now },
	invitation_code: {type: String, required: true},
	registered: {type: Boolean, default: false}
});


// schema.methods.save_q = function () {
// 	var deferred = Q.defer();
// 	this.save(function(err, result){
// 		if (err) {
// 	        deferred.reject(new Error(err));
// 	    } else {
// 	        deferred.resolve(result);
// 	    }
// 	});
// 	return deferred.promise;
// };

var SignUp = mongoose.model('SignUp', schema);

module.exports = SignUp;
