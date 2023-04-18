const catchAsyncErrors = require('../utils/catchAsyncErrors');
const AppError = require('../utils/errorHandling/appError');

exports.protect = catchAsyncErrors(async (req, res, next) => {
  if (req.session.userId) {
    next();
  } else {
    next(new AppError('Admin User not authenticated. Please log in!', 401));
  }
});
