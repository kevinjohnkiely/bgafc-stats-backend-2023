const catchAsyncErrors = require('../utils/catchAsyncErrors');
const AppError = require('../utils/errorHandling/appError');
const Player = require('../models/playerModel');

exports.getSharpShooters = catchAsyncErrors(async (req, res, next) => {
  const ssPlayers = await Player.find({
    totalGoals: { $gte: 50 },
  }).sort({ totalGoals: -1 });

  res.status(200).json({
    status: 'success',
    numOfSSPlayers: ssPlayers.length,
    data: {
      ssPlayers,
    },
  });
});
