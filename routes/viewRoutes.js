const express = require('express');
const {
  getPlayers,
  getPlayer,
  getLoginForm,
} = require('../controllers/viewsController');
const { isLoggedIn } = require('../middleware/isLoggedIn');

const router = express.Router();

router.use(isLoggedIn);

router.get('/', getPlayers);
router.get('/players/:slug', getPlayer);
router.get('/login', getLoginForm);

module.exports = router;
