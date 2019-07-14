const jwt = require('jsonwebtoken');

const Err = require('../utils/error');
const { JWT_SECRETKEY } = require('../constant/index');
const client = require('../config/redis');

const tokenDecode = async(token, res) => {
	try{
		return jwt.verify(token, JWT_SECRETKEY)
	} catch(err) {
		new Err(err.message).Unauthorized(res);
	}
}

module.exports = async (req, res, next) => {
    try {
		const token = req.header('Authorization');

		const decoded = await tokenDecode(token, res);
		const authUser = JSON.parse(Buffer.from(decoded.data, 'base64'));

		const blacklist = await client.getAsync(`user:${authUser.id}:${token}`);
		if (blacklist) new Err('User already logout').Unauthorized(res);

		req.authUser = authUser;
		req.token = token;
		next()
    } catch (err) {
        next(err)
    }
};
