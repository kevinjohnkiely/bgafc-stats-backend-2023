const express = require('express');
const {
  getSharpshooters,
  createSharpshooter,
  getOneSharpshooter,
} = require('../controllers/sharpshootersController');

const router = express.Router({ mergeParams: true });
router.route('/').get(getSharpshooters).post(createSharpshooter);
router.route('/:playerSlug').get(getOneSharpshooter);

module.exports = router;
