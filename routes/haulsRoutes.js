const express = require('express');

const {
  getAllHauls,
  getPlayersWithHauls,
  createHaul,
  updateHaul,
  deleteHaul
} = require('../controllers/haulsController');

const { protect } = require('../middleware/auth');

const router = express.Router({ mergeParams: true });

// router.route('/').get(getAllHauls);
router.route('/').get(getPlayersWithHauls).post(protect, createHaul);
router
  .route('/:haulId')
  .patch(protect, updateHaul)
  .delete(deleteHaul);

module.exports = router;
