var mongoose = require ("mongoose");

var schema = new mongoose.Schema({
	uri: {type: String, trim: true, lowercase: true, required: true },
	guid: {type: String, trim:true, required: true},
	committed: {type: Boolean, required: true, default: false}
});

// schema.statics.isCommitted = function (uri, guid, callback){
// 	model.findOne({ uri: uri, guid: guid, committed: false }, function(err, doc){
// 		if (err) return callback(err, false);
// 		else if(doc){
// 			return callback(null, doc);
// 		} else {
// 			return callback(null, null);
// 		}
// 	});
// };

var model = mongoose.model('PoeLinks', schema);

module.exports = model;