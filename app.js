const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { errorLogger, accessLogger } = require('./midleware/logs')

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(accessLogger)
require('./routes/index')(app);
app.use(errorLogger);
app.use(require('./midleware/error_handling'))


module.exports = app;
