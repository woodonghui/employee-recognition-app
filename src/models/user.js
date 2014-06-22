var mongoose = require ("mongoose");
var validate = require('mongoose-validator').validate;
var Q = require('q');

var passwordValidator = [
	validate({message: "Password should be between 6 and 20 characters!"}, 'len', 6, 20),
	validate({message: "Password should only contain letters and numbers!"}, 'isAlphanumeric')
];

var schema = new mongoose.Schema({
	email: { type: String, trim: true, lowercase: true, required: true, unique: true },
	password: { type: String, required: 'Password is required!', validate: passwordValidator }, 
	// crypto password

	name: {
		first: { type: String, trim: true, required: 'First Name is required!' },
		middle: { type: String, trim: true }, 
		last: { type: String, trim: true, required: "Last Name is required!" }
	},

	birth_date: { type: Date },
	country: { type: String },
	department: { type: String },
	designation: { type: String },
	join_date: { type: Date },	
	avatar: { type: String },
	created_date: { type: Date, default: Date.now },
});

schema.statics.ifExistQ = function (email) {
	var deferred = Q.defer();

	this.findOne(
		{email: email.toLowerCase()}, 
		function(err, result){
			if (err) {
		        deferred.reject(new Error(err));
		    } else {
		        deferred.resolve(result);
		    }
	});

	return deferred.promise;
};


module.exports = mongoose.model('User', schema);
