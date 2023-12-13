const express = require('express');

const {
  get200Club,
  create200Club,
} = require('../controllers/200clubController');

const { protect } = require('../middleware/auth');

const router = express.Router();

// router.route('/').get(get200Club);
router.route('/').get(get200Club).post(protect, create200Club);

// router
//   .route('/uploadphoto/:playerSlug')
//   .post(protect, upload.single('photo'), uploadPhoto);
// router
//   .route('/:playerSlug')
//   .get(getOnePlayer)
//   .patch(protect, updatePlayer)
//   .delete(protect, deletePlayer);

module.exports = router;
