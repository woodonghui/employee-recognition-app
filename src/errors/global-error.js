function GlobalError(message, errors) {
  this.name = "GlobalError";
  // this.status = status || 404;
  this.message = message || "Global error";
  this.errors = errors || {};
}

GlobalError.prototype = new Error();
GlobalError.prototype.constructor = GlobalError;

module.exports = GlobalError;

/*
var mapping = require('./mapping');

function CommonError(name) {
  this.name = name;
  this.message = mapping.getMessage(name) || name;
}
CommonError.prototype = new Error();
CommonError.prototype.constructor = CommonError;

module.exports = CommonError;
*/


/******************************
/* error instance *
{ message: 'Validation failed',
  name: 'ValidationError',
  errors: 
   { email: 
      { message: 'invalid email address...',
        name: 'ValidatorError',
        path: 'email',
        type: 'user defined',
        value: 'abc' } } }
*********************************/
                
