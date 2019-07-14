const usersRouter = require('./users');
const authRouter = require('./auth');
const Err = require('../utils/error');

module.exports = (app) => {
	app.get('/', (_req, res, _next) => {
		res.render('index', { title: 'Express' });
	});

	app.use('/users', usersRouter);
	app.use('/auth', authRouter);

	// Catch all
	app.use('*', function (req, res, next) {
		new Err(`Path ${req.originalUrl} does not exist`).NotFound(res)
	});
};
