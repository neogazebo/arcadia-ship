const { BAD_REQUEST, FORBIDDEN, INTERNAL_SERVER_ERROR, UNAUTHORIZED, NOT_FOUND } = require('../constant/http_status')

const error = function(message) {
    this.err = new Error(message);
}

error.prototype.BadRequest = function (res) {
    res.status(BAD_REQUEST);
    throw this.err;
}

error.prototype.Forbidden = function (res) {
    res.status(FORBIDDEN);
    throw this.err;
}

error.prototype.Unauthorized = function (res) {
    res.status(UNAUTHORIZED);
    throw this.err;
}

error.prototype.InternalServerError = function (res) {
    res.status(INTERNAL_SERVER_ERROR);
    throw this.err;
}

error.prototype.NotFound = function (res) {
    res.status(NOT_FOUND);
    throw this.err;
}

module.exports = error;