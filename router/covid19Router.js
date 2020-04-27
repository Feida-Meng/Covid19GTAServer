const express = require('express');
const router = express.Router();

const { getLatestCases, getAllCases, getCasesByCityAndDate } = require('../controllers/covid19Controller');

router.route('/history').get(getAllCases);

router.route('/chartdata').get(getCasesByCityAndDate);

router.route('/').get(getLatestCases);

module.exports = router;