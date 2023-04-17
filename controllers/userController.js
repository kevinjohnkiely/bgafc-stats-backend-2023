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

exports.getAuthUser = catchAsyncErrors(async (req, res, next) => {
  const authUserID = req.session.userId;

  if(!authUserID) {
    return next(new AppError('User not authenticated', 401));
  }

  const user = await User.findById(authUserID)
  
});

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

  req.session.userId = newUser._id;

  res.status(201).json({
    status: 'success',
    data: {
      user: newUser,
    },
  });
});

exports.login = catchAsyncErrors(async (req, res, next) => {
  const { username } = req.body;
  const { password } = req.body;

  if (!username || !password) {
    return next(new AppError('Parameters missing! Try again...', 400));
  }

  const user = await User.findOne({ username: username }).select(
    '+password +email'
  );

  if (!user) {
    return next(new AppError('Invalid login credentials! Try again...', 401));
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return next(new AppError('Invalid login credentials! Try again...', 401));
  }

  req.session.userId = user._id;
  res.status(201).json({
    status: 'success',
    data: {
      user: user,
    },
  });
});
