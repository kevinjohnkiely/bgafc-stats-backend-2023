const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const catchAsyncErrors = require('../utils/catchAsyncErrors');
const AppError = require('../utils/errorHandling/appError');

exports.getAllUsers = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
};
exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
};

exports.getOneUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
};

exports.updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
};

exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
};

exports.signUp = catchAsyncErrors(async (req, res, next) => {
  const { username } = req.body;
  const passwordRaw = req.body.password;

  if (!username || !passwordRaw) {
    return next(new AppError('Credentials are missing! Try again...', 400));
  }

  const existingUsername = await User.findOne({ username: username });
  if (existingUsername) {
    return next(new AppError('Username already taken! Choose again...', 409));
  }

  const hashedPassword = await bcrypt.hash(passwordRaw, 10);
  const newUser = await User.create({
    username: username,
    password: hashedPassword,
  });

  res.status(201).json({
    status: 'success',
    data: {
      user: newUser,
    },
  });
});
