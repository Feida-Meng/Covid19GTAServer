const Covid19 = require('../models/covid19Model');

exports.getLatestCases = async (req, res) => {

	try {
		const newDate = new Date();

		const startDate = new Date(newDate.getFullYear(),newDate.getMonth(),newDate.getDate());
		startDate.setHours(0,0,0,0);

		const results = await Covid19.find({ createdAt: {$gte: startDate } }).sort({ cases: -1 });

		res.status(200).json({
			status: 'success',
			results: results.length,
			data: {
				data: results
			}
		});
	} catch (e) {

		console.error(e);
		
		res.status(500).json({
			status: 'fail',
			message: 'something went wrong'
		});
	}

};




