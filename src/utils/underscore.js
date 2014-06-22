var _ = require('underscore');

_.mixin({

	isEmail: function(email) {
		var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(email);
	},

	isSomeEmpty: function(arr) {
		return _.some(arr, _.isEmpty);
	},

  parseValidationErrors: function(err) {
    /*{ message: 'Validation failed',
      name: 'ValidationError',
      errors: 
       { 'name.last': 
          { message: 'Last Name is required!',
            name: 'ValidatorError',
            path: 'name.last',
            type: 'required',
            value: '' },
         'name.first': 
          { message: 'First Name is required!',
            name: 'ValidatorError',
            path: 'name.first',
            type: 'required',
            value: '' },
         password: 
          { message: 'Password should only contain letters and numbers!',
            name: 'ValidatorError',
            path: 'password',
            type: 'user defined',
            value: '!@##$' } } }
    */
    return _.values(err.errors);
  }

  // compactObject : function(o) {
  // 	_.each(o, function(v, k){
  // 		if(_.isNull(v) || _.isUndefined(v)) delete o[k];
  // 	});
  // 	return o;
  // },

  // queryObject : function(o) {
  // 	var obj = this.compactObject(o);
  // 	var arr = _.map(obj, function(v, k) {
  // 		return k + "=" + v;
  // 	});
  // 	return arr.join("&");
  // }

});

module.exports = _;


