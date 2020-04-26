
const dotenv = require('dotenv');

dotenv.config({ path: process.env.NODE_ENV === 'production' ? './config_prod.env' : './config_dev.env' });

const app = require('./app');
const mongoose = require('mongoose');

const DBUri = process.env.DB_DEV.replace('<PASSWORD>', process.env.DB_DEV_PASSWORD);

mongoose
.connect(DBUri, { useNewUrlParser: true, useUnifiedTopology: true })
.then( () => {
	console.log('mongoose server successfully connected!!');
})
.catch(e => console.log('mongoose server connected error!!', e));

const port = process.env.PORT || 3333;

const server = app.listen(port, () => {
	console.log(`${process.env.NODE_ENV} server listening on ${port}`);
});

