const the200Club = require('../models/200clubModel');
const catchAsyncErrors = require('../utils/catchAsyncErrors');
const AppError = require('../utils/errorHandling/appError');
const Player = require('../models/playerModel');

exports.get200Club = catchAsyncErrors(async (req, res, next) => {
  const the200Players = await Player.find({ totalApps: { $gte: 200 }}).sort({ totalApps: -1 }).populate('the200Club');
  // const the200Players = await Player.find({
  //   totalApps: { $gte: 200 },
  // }).sort({ totalApps: -1 });

  res.status(200).json({
    status: 'success',
    numOf200Players: the200Players.length,
    data: {
      the200Players,
    },
  });
});

exports.create200Club = catchAsyncErrors(async (req, res, next) => {
  if (!req.body.player) req.body.player = req.params.playerId;
  const new200club = await the200Club.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      the200club: new200club,
    },
  });
});
