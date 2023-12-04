const express = require('express');

const {
  getSeasonBySeasonTopScorers,
  createSeasonBySeason,
} = require('../controllers/seasonBySeasonController');

const router = express.Router({ mergeParams: true });

router.route('/').get(getSeasonBySeasonTopScorers).post(createSeasonBySeason);

module.exports = router;
