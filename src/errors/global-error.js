function GlobalError(status, message) {
  this.name = "GlobalError";
  this.status = status || 404;
  this.message = message || "GlobalError";
}
GlobalError.prototype = new Error();
GlobalError.prototype.constructor = GlobalError;

module.exports = GlobalError;