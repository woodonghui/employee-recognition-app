function CommonError(message) {
  this.name = "CommonError";
  this.message = message || "CommonError";
}
CommonError.prototype = new Error();
CommonError.prototype.constructor = CommonError;

module.exports = CommonError;