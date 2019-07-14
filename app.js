const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { errorLogger, accessLogger } = require('./midleware/logs')
const { INTERNAL_SERVER_ERROR, SUCCESS } = require('./constant/http_status')

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(accessLogger)

require('./routes/index')(app);


app.use(errorLogger);
app.use((err, _req, res, next) => {
    if (res.statusCode === SUCCESS || !res.statusCode) res.status(INTERNAL_SERVER_ERROR);
	res.send({ message: err.toString() })
	next(err)
})


module.exports = app;
