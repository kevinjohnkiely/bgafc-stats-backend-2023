const express = require('express');

const {
  getAllSeasons,
  createSeason,
} = require('../controllers/seasonController');

const { protect } = require('../middleware/auth');

const router = express.Router();

router.route('/').get(getAllSeasons).post(protect, createSeason);

module.exports = router;
