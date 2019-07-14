const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../models');
const client = require('../config/redis');
const auth = require('../middleware/auth');
const Validator = require('../utils/validator');
const Result = require('../utils/result');
const Err = require('../utils/error');
const { SALT_ROUND, JWT_SECRETKEY } = require('../constant');
const { AUTH } = require('../constant/auth');

router.post('/register', async (req, res, next) => {
	try {
		const { username, password } = await Validator.validate(req.body, 'AuthRegister', res);
		const hashedPassword = await bcrypt.hash(password, SALT_ROUND);
		db.User.create({ email: username, password: hashedPassword });
		res.json(new Result('success'))
	} catch (err) {
		next(err)
	}
});

router.post('/login', async (req, res, next) => {
	try {
		const { username, password } = await Validator.validate(req.body, 'AuthLogin', res);

		const loginUser = await db.User.findOne({
			where: { email: username }
		})
		await tryLogin(loginUser, password, res);
		const token = generateToken(loginUser);
		res.json(new Result('success', { token }));
	} catch (err) {
		next(err)
	}
});

router.post('/logout',auth, async (req, res, next) => {
	client.set(`user:${req.authUser.id}:${req.token}`, 'logout', 'EX', AUTH.EXPIRED_REDIS_TIME);
	res.json(new Result('logout success'));
})

const tryLogin = async (loginUser, password, res) => {
	if (!loginUser) new Err('user not exist').BadRequest(res);

	const match = await bcrypt.compare(password, loginUser.password);
	if (!match) new Err('wrong password').BadRequest(res)
}

const generateToken = (loginUser) => {
	const payload = {
		id: loginUser.id,
		username: loginUser.email
	};
	const data = (Buffer.from(JSON.stringify(payload))).toString('base64');
	return jwt.sign({ data }, JWT_SECRETKEY, { expiresIn: AUTH.EXPIRED_JWT_TOKEN })
}

module.exports = router;