const express = require('express');

// const bodyParser = require('body-parser');
const compression = require('compression');

//security packages
const helmet = require('helmet');
const hpp = require('hpp');
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100 // limit each IP to 100 requests per windowMs
});
//security packages

const app = express();

app.use(limiter);
app.use(helmet());
//make sure the body is parased before this line
app.use(hpp());
app.use(compression());


module.exports = app;