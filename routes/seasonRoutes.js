const express = require('express');

const {
  getSeasonsByPlayer,
  createSeason,
  updateSeason,
  deleteSeason,
} = require('../controllers/seasonController');

const { protect } = require('../middleware/auth');

const router = express.Router({ mergeParams: true });

router.route('/').get(getSeasonsByPlayer).post(protect, createSeason);
router.route('/:seasonId').patch(protect, updateSeason).delete(deleteSeason);

module.exports = router;
