const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const catchAsyncErrors = require('../utils/catchAsyncErrors');
const AppError = require('../utils/errorHandling/appError');

const signToken = (id) => {
  console.log(`JWT SECRET is ${process.env.JWT_SECRET}`);
  console.log(id);
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
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

exports.login = catchAsyncErrors(async (req, res, next) => {
  const { username, password } = req.body;
  console.log(`CREDS ARE ${username}, ${password}`);

  if (!username || !password) {
    console.log(`FAILED CREDS ARE ${username}, ${password}`);
    return next(new AppError('Parameters missing! Try again...', 400));
  }

  const user = await User.findOne({ username: username }).select('+password');

  console.log(`THE USER IS: ${user}`);

  if (!user) {
    return next(new AppError('Invalid login credentials! Try again...', 401));
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return next(new AppError('Invalid login credentials! Try again...', 401));
  }
  //all ok, create json token
  const token = signToken(user._id);

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

  res.cookie('jwt', token, cookieOptions);

  res.status(200).json({
    status: 'success',
    token,
    data: {
      user: user,
    },
  });
});

exports.logout = (req, res) => {
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ status: 'success' });
};
