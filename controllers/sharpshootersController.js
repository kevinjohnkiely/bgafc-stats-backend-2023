const catchAsyncErrors = require('../utils/catchAsyncErrors');
const AppError = require('../utils/errorHandling/appError');
const Player = require('../models/playerModel');
const Sharpshooter = require('../models/sharpshooterModel');

exports.getSharpshooters = catchAsyncErrors(async (req, res, next) => {
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

exports.createSharpshooter = catchAsyncErrors(async (req, res, next) => {
  if (!req.body.player) req.body.player = req.params.playerId;
  const newSS = await Sharpshooter.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      sharpshooter: newSS,
    },
  });
});

exports.getOneSharpshooter = catchAsyncErrors(async (req, res, next) => {
  const player = await Player.findOne({ slug: req.params.playerSlug }).populate(
    'seasons'
  );

  if (!player) {
    return next(new AppError('That Player does not exist!', 404));
  }

  const ss = await Sharpshooter.findOne({ player: player._id });

  res.status(200).json({
    status: 'success',
    data: {
      player: player,
      ss: ss,
    },
  });
});
