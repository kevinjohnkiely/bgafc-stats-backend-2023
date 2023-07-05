const express = require('express');
const {
  getPlayers,
  getPlayer,
  getLoginForm,
} = require('../controllers/viewsController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.get('/', getPlayers);
router.get('/players/:slug', protect, getPlayer);
router.get('/login', getLoginForm);

module.exports = router;
