var mongoose = require ("mongoose");

var recognitionSchema = new mongoose.Schema({
	from_peer: { type: String, required: true },
	to_peer: { type: String, required: true },
	type: { type: String, required: true },
	reason: { type: String, required: true },
	date_time: { type: Date, default: Date.now() }
});