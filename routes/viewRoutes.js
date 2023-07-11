const express = require('express');
const {
  getPlayers,
  getPlayer,
  getLoginForm,
  addPlayer
} = require('../controllers/viewsController');
const { protect } = require('../middleware/auth');
const { isLoggedIn } = require('../middleware/isLoggedIn');

const router = express.Router();

router.get('/', isLoggedIn, getPlayers);
router.get('/players/:slug', isLoggedIn, getPlayer);
router.get('/login', isLoggedIn, getLoginForm);
router.get('/addplayer', protect, addPlayer)

module.exports = router;
