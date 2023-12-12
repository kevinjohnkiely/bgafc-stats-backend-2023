const express = require('express');
const {
  getSharpshooters,
  createSharpshooter,
  getOneSharpshooter,
  updateOneSharpshooter,
  deleteOneSharpshooter
} = require('../controllers/sharpshootersController');

const { protect } = require('../middleware/auth');

const router = express.Router({ mergeParams: true });
router.route('/').get(getSharpshooters).post(protect, createSharpshooter);
router
  .route('/:playerSlug')
  .get(getOneSharpshooter)
  .patch(protect, updateOneSharpshooter)
  .delete(protect, deleteOneSharpshooter);

module.exports = router;
