const express = require('express');

const {
  getAllPlayers,
  createPlayer,
  getOnePlayer,
  updatePlayer,
  deletePlayer,
} = require('../controllers/playerController');

const router = express.Router();

router.route('/').get(getAllPlayers).post(createPlayer);
router
  .route('/:playerSlug')
  .get(getOnePlayer)
  .patch(updatePlayer)
  .delete(deletePlayer);

module.exports = router;
