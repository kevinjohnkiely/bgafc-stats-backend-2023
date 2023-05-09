const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const catchAsyncErrors = require('../utils/catchAsyncErrors');
const AppError = require('../utils/errorHandling/appError');

exports.getAllUsers = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined 1',
  });
};
exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined 2',
  });
};

exports.getOneUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined 3',
  });
};

exports.updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined 4',
  });
};

exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined 5',
  });
};

exports.getAuthUser = catchAsyncErrors(async (req, res, next) => {
  const loggedInUser = await User.findById(req.session.userId);
  console.log(loggedInUser);
  res.status(200).json({
    status: 'success',
    data: {
      user: loggedInUser,
    },
  });
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

  const user = await User.findOne({ username: username }).select('+password');

  if (!user) {
    return next(new AppError('Invalid login credentials! Try again...', 401));
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return next(new AppError('Invalid login credentials! Try again...', 401));
  }
  //all ok, establish session
  req.session.userId = user._id;
  res.status(201).json({
    status: 'success',
    data: {
      user: user,
    },
  });
});

exports.logout = catchAsyncErrors(async (req, res, next) => {
  req.session.destroy((error) => {
    if (error) {
      return next(new AppError('Failed to log out! Try again...', 401));
    }
    res.sendStatus(200);
  });
});
