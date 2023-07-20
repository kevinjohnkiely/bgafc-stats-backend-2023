const express = require('express');
const {
  getPlayers,
  getPlayer,
  getLoginForm,
  loggedOutInfo,
  addPlayer,
  updatePlayer,
  addSeason,
  updateSeason
} = require('../controllers/viewsController');
const { protect } = require('../middleware/auth');
const { isLoggedIn } = require('../middleware/isLoggedIn');

const router = express.Router();

router.get('/', isLoggedIn, getPlayers);
router.get('/players/:slug', isLoggedIn, getPlayer);
router.get('/players/:slug/edit', isLoggedIn, updatePlayer);
router.get('/login', isLoggedIn, getLoginForm);
router.get('/logout', isLoggedIn, loggedOutInfo);
router.get('/addplayer', protect, addPlayer);
router.get('/addseason/:playerId/:team', protect, addSeason);
router.get('/seasons/:seasonId/edit', protect, updateSeason);

module.exports = router;
