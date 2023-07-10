const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const User = require('../models/userModel');
const catchAsyncErrors = require('../utils/catchAsyncErrors');

// only for rendered pages, no errors!
exports.isLoggedIn = catchAsyncErrors(async (req, res, next) => {
  if (req.cookies.jwt) {
    // 1 - verifies token
    const decoded = await promisify(jwt.verify)(
      req.cookies.jwt,
      process.env.JWT_SECRET
    );
    console.log(decoded);

    // 2) Check if user still exists
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return next();
    }

    // THERE IS A LOGGED IN USER
    res.locals.user = currentUser;
    return next();
  }
  next();
});
