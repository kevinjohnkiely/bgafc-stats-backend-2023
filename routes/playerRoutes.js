const express = require('express');
const playerController = require('./../controllers/playerController');
const router = express.Router();

router.param('slug', (req, res, next, val) => {
  console.log(`Player slug is ${val}`);
  next();
});

router
  .route('/')
  .get(playerController.getAllPlayers)
  .post(playerController.createPlayer);
router
  .route('/:slug')
  .get(playerController.getPlayer)
  .patch(playerController.updatePlayer)
  .delete(playerController.deletePlayer);

module.exports = router;
