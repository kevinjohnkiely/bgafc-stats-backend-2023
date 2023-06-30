const express = require('express');

const {
  getAllPlayers,
  createPlayer,
  getOnePlayer,
  updatePlayer,
  deletePlayer,
  uploadPhoto,
} = require('../controllers/playerController');

const seasonRouter = require('./seasonRoutes');

const { protect } = require('../middleware/auth');

const router = express.Router();

router.use('/:playerId/seasons', seasonRouter);

router.route('/').get(getAllPlayers).post(protect, createPlayer);
router.route('/uploadphoto/:playerSlug').post(protect, uploadPhoto);
router
  .route('/:playerSlug')
  .get(getOnePlayer)
  .patch(protect, updatePlayer)
  .delete(protect, deletePlayer);

module.exports = router;
