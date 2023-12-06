const express = require('express');

const {
  getSeasonBySeasonTopScorers,
  createSeasonBySeason,
  updateSeasonBySeason,
  deleteSeasonBySeason,
} = require('../controllers/seasonBySeasonController');

const { protect } = require('../middleware/auth');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(getSeasonBySeasonTopScorers)
  .post(protect, createSeasonBySeason);
router
  .route('/:sbsId')
  .patch(protect, updateSeasonBySeason)
  .delete(protect, deleteSeasonBySeason);

module.exports = router;
