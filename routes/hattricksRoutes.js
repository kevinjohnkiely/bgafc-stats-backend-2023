const express = require('express');

const {
  getAllHattricks,
  getPlayersWithHattricks,
  createHattrick,
  updateHattrick,
  deleteHattrick,
} = require('../controllers/hattricksController');

const { protect } = require('../middleware/auth');

const router = express.Router({ mergeParams: true });

// router.route('/hat-tricks').get(getPlayersWithHattricks);
router.route('/').get(getPlayersWithHattricks).post(protect, createHattrick);
router
  .route('/:hattrickId')
  .patch(protect, updateHattrick)
  .delete(deleteHattrick);

module.exports = router;
