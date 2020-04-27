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


exports.getAllCases = async (req, res) => {

	try {
		const startDate = new Date('2020-04-05T02:09:32.659Z');

		const match = { $match: { createdAt: { $gte: startDate } } };
		const group = { $group: { _id: '$createdAt', data: { $push: { cases: '$cases', cityAndRegion: '$cityAndRegion', createdAt: '$createdAt' } } } };
		const unwind={ $unwind: "$data" };
		const sort1 = { $sort: { _id: 1, 'data.cases': -1 } };
		const reGroup = { $group: { _id: "$_id", data: { $push: "$data" } } };
		const sort2 = { $sort: { _id: 1 } };


		const results = await Covid19.aggregate([
			match,
			group,
			unwind,
			sort1,
			reGroup,
			sort2
		]);


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


exports.getCasesByCityAndDate = async (req, res) => {

	try {
		const startDate = new Date('2020-04-05T02:09:32.659Z');

		const match = { $match: { $and:[ { createdAt: { $gte: startDate } }, { createdAt: { $ne: new Date('2020-04-22T01:12:54.932Z') }  } ] } };
		const group = { $group: { _id: '$cityAndRegion', data: { $push: { cases: '$cases', cityAndRegion: '$cityAndRegion', createdAt: '$createdAt' } } } };
		const unwind={ $unwind: "$data" };
		const sort1 = { $sort: { _id: 1, 'data.createdAt': 1 } };
		const reGroup = { $group: { _id: "$_id", data: { $push: "$data.cases" } } };


		const results = await Covid19.aggregate([
			match,
			group,
			unwind,
			sort1,
			reGroup,
		]);

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





