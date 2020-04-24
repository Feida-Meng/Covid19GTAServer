
const dotenv = require('dotenv');
dotenv.config({ path: './config_dev.env' });

const app = require('./app');

const port = process.env.Port || 3333;

const server = app.listen(port, () => {
	console.log(`server listening on ${port}`);
});

