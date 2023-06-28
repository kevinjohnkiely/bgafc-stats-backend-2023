const express = require('express');

const {
  signUp,
  login,
  // getAuthUser,
  // logout,
} = require('../controllers/userController');

const router = express.Router();

// router.route('/getuser').get(getAuthUser);
router.route('/signup').post(signUp);
router.route('/login').post(login);
// router.route('/logout').post(logout);

module.exports = router;
