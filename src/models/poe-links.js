var mongoose = require ("mongoose");
var Q = require('q');
var util = require('util');
var shortId = require('shortid');

var schema = new mongoose.Schema({
	uri: {type: String, trim: true, lowercase: true, required: true },
	guid: {type: String, trim:true, required: true},
	committed: {type: Boolean, required: true, default: false}
});

schema.statics.createQ = function (uri) {
	var deferred = Q.defer();
	var poe = new this({
		uri: uri,
		guid: shortId.generate()
	});

	poe.save(function(err, result){
		if (err) {
	        deferred.reject(new Error(err));
	    } else {
	        deferred.resolve(result);
	    }
	});
	return deferred.promise;
};


schema.statics.seekQ = function (uri, guid) {
	var deferred = Q.defer();

	this.findOneAndUpdate(
		{uri: uri, guid: guid, committed: false}, 
		{committed: true}, 
		function(err, result){
			if (err) {
		        deferred.reject(new Error(err));
		    } else {
		        deferred.resolve(result);
		    }
	});

	return deferred.promise;
};

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

schema.virtual('poelink').get(function () {
  return util.format('%s/%s', this.uri, this.guid);
});

var PoeLink = mongoose.model('PoeLink', schema);

module.exports = PoeLink;