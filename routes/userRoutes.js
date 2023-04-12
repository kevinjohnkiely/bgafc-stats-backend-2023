const express = require('express');

const {
  getAllUsers,
  createUser,
  getOneUser,
  updateUser,
  deleteUser,
  signUp,
} = require('../controllers/userController');

const router = express.Router();

router.route('/').get(getAllUsers).post(createUser);
router.route('/:id').get(getOneUser).patch(updateUser).delete(deleteUser);
router.route('/signup').post(signUp);

module.exports = router;
