const express = require('express');
const {
  getPlayers,
  getPlayersSorted,
  getPlayer,
  getLoginForm,
  loggedOutInfo,
  addPlayer,
  updatePlayer,
  addSeason,
  updateSeason,
  addPhoto
} = require('../controllers/viewsController');
const { protect } = require('../middleware/auth');
const { isLoggedIn } = require('../middleware/isLoggedIn');

const router = express.Router();

router.get('/', isLoggedIn, getPlayers);
router.get('/players/sort/:sorter', isLoggedIn, getPlayersSorted);
router.get('/players/:slug', isLoggedIn, getPlayer);
router.get('/players/:slug/edit', isLoggedIn, updatePlayer);
router.get('/login', isLoggedIn, getLoginForm);
router.get('/logout', isLoggedIn, loggedOutInfo);
router.get('/addplayer', protect, addPlayer);
router.get('/addseason/:playerId/:team', protect, addSeason);
router.get('/seasons/:seasonId/edit', protect, updateSeason);
router.get('/addphoto/:slug', protect, addPhoto)

module.exports = router;
