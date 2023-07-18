const express = require('express');
const {
  getPlayers,
  getPlayer,
  getLoginForm,
  loggedOutInfo,
  addPlayer
} = require('../controllers/viewsController');
const { protect } = require('../middleware/auth');
const { isLoggedIn } = require('../middleware/isLoggedIn');

const router = express.Router();

router.get('/', isLoggedIn, getPlayers);
router.get('/players/:slug', isLoggedIn, getPlayer);
router.get('/login', isLoggedIn, getLoginForm);
router.get('/logout', isLoggedIn, loggedOutInfo);
router.get('/addplayer', protect, addPlayer)

module.exports = router;
