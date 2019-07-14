const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { errorLogger, accessLogger } = require('./midleware/logs')
// const client = require('./config/redis');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const { INTERNAL_SERVER_ERROR } = require('./constant/error')

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(accessLogger)

// client.on('connect', () => {
//     console.log(`connected to redis`);
// });
// client.on('error', err => {
//     console.log(`Error: ${err}`);
// });

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);

app.use(errorLogger);
app.use((err, req, res, next) => {
	res.status(INTERNAL_SERVER_ERROR||err.status).send({ message: err.message })
	next(err)
})


module.exports = app;
