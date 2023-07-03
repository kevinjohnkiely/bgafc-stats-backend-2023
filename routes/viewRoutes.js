const express = require('express');
const { getPlayers, getPlayer } = require('../controllers/viewsController');

const router = express.Router();

router.get('/', getPlayers);
router.get('/players/:slug', getPlayer);

module.exports = router;
