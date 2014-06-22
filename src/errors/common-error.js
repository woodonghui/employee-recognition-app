var mapping = require('./mapping');

function CommonError(name) {
  this.name = name;
  this.message = mapping.getMessage(name) || name;
}
CommonError.prototype = new Error();
CommonError.prototype.constructor = CommonError;

module.exports = CommonError;