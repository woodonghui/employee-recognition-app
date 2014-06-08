var mongoose = require ("mongoose");

var schema = new mongoose.Schema({
	email: { type: String, trim: true, lowercase: true, required: true, unique: true },
	name: {
		first: { type: String, trim: true, required: true },
		middle: { type: String, trim: true }, 
		last: { type: String, trim: true, required: true }
	},
	birth_date: { type: Date },
	country: { type: String },
	department: { type: String },
	designation: { type: String },
	join_date: { type: Date },	
	avatar: { type: String },
	password: { type: String, required: true }, // crypto password
	created_date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', schema);
