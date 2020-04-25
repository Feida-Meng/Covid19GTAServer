const mongoose = require('mongoose');

const schema = new mongoose.Schema({
	cityAndRegion: {
		type: String,
		required: true,

	},
	cases: {
		type: Number,
		required: true
	},
	createdAt: {
		type: Date,
		default: Date.now(),
		// select: false
	},
});

const Covid19 = mongoose.model('Covid19', schema);

module.exports = Covid19;
