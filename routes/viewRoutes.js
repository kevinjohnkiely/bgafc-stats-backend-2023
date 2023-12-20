const express = require('express');
const {
  getDashboard,
  getPlayers,
  getPlayersSorted,
  getPlayersSearch,
  getPlayer,
  getLoginForm,
  loggedOutInfo,
  addPlayer,
  updatePlayer,
  addSeason,
  updateSeason,
  addPhoto,
  addHattrick,
  getSharpshooters,
  addSharpshooter,
  getPlayersDashSearch,
} = require('../controllers/viewsController');
const { protect } = require('../middleware/auth');
const { isLoggedIn } = require('../middleware/isLoggedIn');

const router = express.Router();

// DASHBOARD
router.get('/dashboard', isLoggedIn, getDashboard);
router.get('/dashboard/search/:term', isLoggedIn, getPlayersDashSearch);

// PLAYERS
router.get('/', isLoggedIn, getPlayers);
router.get('/players/sort/:sorter', isLoggedIn, getPlayersSorted);
router.get('/players/search/:term', isLoggedIn, getPlayersSearch);
router.get('/players/:slug', isLoggedIn, getPlayer);
router.get('/players/:slug/edit', protect, updatePlayer);
router.get('/addplayer', protect, addPlayer);
router.get('/addphoto/:slug', protect, addPhoto);

// AUTH
router.get('/login', isLoggedIn, getLoginForm);
router.get('/logout', isLoggedIn, loggedOutInfo);

// SEASONS
router.get('/addseason/:playerId/:team', protect, addSeason);
router.get('/seasons/:seasonId/edit/:playerSlug', protect, updateSeason);

// SHARPSHOOTERS
router.get('/sharpshooters', isLoggedIn, getSharpshooters);
router.get('/addsharpshooter/:playerSlug', protect, addSharpshooter);

router.get('/addhattrick/:playerId', protect, addHattrick);

module.exports = router;
