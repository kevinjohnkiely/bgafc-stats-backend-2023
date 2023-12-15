const express = require('express');

const {
  getPOY,
  createPOY,
  updatePOY,
  deletePOY,
} = require('../controllers/poyController.js');

const { protect } = require('../middleware/auth');

const router = express.Router({ mergeParams: true });

router.route('/').get(getPOY).post(protect, createPOY);
router.route('/:poyId').patch(protect, updatePOY).delete(protect, deletePOY);

module.exports = router;
