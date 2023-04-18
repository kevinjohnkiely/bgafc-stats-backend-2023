const express = require('express');

const {
  getAllUsers,
  createUser,
  // getOneUser,
  // updateUser,
  // deleteUser,
  signUp,
  login,
  getAuthUser,
  logout,
} = require('../controllers/userController');

const router = express.Router();

router.route('/').get(getAllUsers).post(createUser);
// router.route('/:id').get(getOneUser).patch(updateUser).delete(deleteUser);

router.route('/getuser').get(getAuthUser);
router.route('/signup').post(signUp);
router.route('/login').post(login);
router.route('/logout').post(logout);

module.exports = router;
