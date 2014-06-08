var CommonError = require('./common-error.js');

function ValidationError(message) {
  this.name = "ValidationError";
  this.message = message || "Validation Error";
}
ValidationError.prototype = new CommonError();
ValidationError.prototype.constructor = ValidationError;

module.exports = ValidationError;