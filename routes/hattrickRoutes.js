const express = require('express');

const {
  getHattricksByPlayer,
  createHattrick,
  updateHattrick,
  deleteHattrick,
} = require('../controllers/hattricksController');

const { protect } = require('../middleware/auth');

const router = express.Router({ mergeParams: true });

router.route('/').get(getHattricksByPlayer).post(protect, createHattrick);
router
  .route('/:hattrickId')
  .patch(protect, updateHattrick)
  .delete(deleteHattrick);

module.exports = router;
