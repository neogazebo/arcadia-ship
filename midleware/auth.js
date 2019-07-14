const jwt = require('jsonwebtoken');

const Err = require('../utils/error');
const { JWT_SECRETKEY } = require('../constant/index');
const client = require('../config/redis');

module.exports = async (req, res, next) => {
    try {
        const token = req.header('Authorization');
		const decoded = await jwt.verify(token, JWT_SECRETKEY);
		if (!decoded) {
			new Err('invalid token').Unauthorized(res);
		}

		const authUser = JSON.parse(Buffer.from(decoded.data, 'base64'));
		const blacklist = await client.getAsync(`user:${authUser.id}:${token}`);
		if (blacklist) {
			new Err('User already logout').Unauthorized(res);
		}

		req.authUser = authUser;
		req.token = token;
		next()
    } catch (err) {
        next(err)
    }
};
