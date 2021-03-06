const express = require('express');
const cors = require('cors');
const covid19Router = require('./router/covid19Router');

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

app.use(cors({ origin: process.env.NODE_ENV === 'production' ? 'https://covid19gta.com' : 'http://localhost:9000' }));
//routing
app.use('/api/v1/covid19', covid19Router);

module.exports = app;