const express = require('express');
const router = express.Router();

const { getLatestCases, getAllCases } = require('../controllers/covid19Controller');


router.route('/history').get(getAllCases);

router.route('/').get(getLatestCases);


module.exports = router;