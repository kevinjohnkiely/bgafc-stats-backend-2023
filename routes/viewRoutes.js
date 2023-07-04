const express = require('express');
const {
  getPlayers,
  getPlayer,
  getLoginForm,
} = require('../controllers/viewsController');

const router = express.Router();

router.get('/', getPlayers);
router.get('/players/:slug', getPlayer);
router.get('/login', getLoginForm);

module.exports = router;
