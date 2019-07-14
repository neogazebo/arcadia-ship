const { INTERNAL_SERVER_ERROR, SUCCESS } = require('../constant/http_status')

module.exports = (err, _req, res, next) => {
    if (res.statusCode === SUCCESS || !res.statusCode) res.status(INTERNAL_SERVER_ERROR);
	res.send({ message: err.toString() })
	next(err)
};
