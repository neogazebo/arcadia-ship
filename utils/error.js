const { BAD_REQUEST, FORBIDDEN, INTERNAL_SERVER_ERROR, UNAUTHORIZED } = require('../constant/error')

const error = function(message) {
    this.err = new Error(message)
    Object.assign(this.err, { message });
}

error.prototype.BadRequest = function() {
    Object.assign(this.err, { status: BAD_REQUEST });
    throw this.err;
}

error.prototype.Forbidden = function() {
    Object.assign(this.err, { status: FORBIDDEN });
    throw this.err;
}

error.prototype.Unauthorized = function() {
    Object.assign(this.err, { status: UNAUTHORIZED });
    throw this.err;
}

error.prototype.InternasServerError = function() {
    Object.assign(this.err, { status: INTERNAL_SERVER_ERROR });
    throw this.err;
}

module.exports = error;