const Haul = require('../models/haulsModel');
const catchAsyncErrors = require('../utils/catchAsyncErrors');
const AppError = require('../utils/errorHandling/appError');
const Player = require('../models/playerModel');

// THIS ROUTE IS NOT USED IN FRONTEND, ONLY FOR POSTMAN TESTING
exports.getAllHauls = catchAsyncErrors(async (req, res, next) => {
  const hauls = await Haul.find();

  res.status(200).json({
    status: 'success',
    numOfHauls: hauls.length,
    data: {
      hauls,
    },
  });
});

exports.getPlayersWithHauls = catchAsyncErrors(async (req, res, next) => {
  const players = await Player.find()
    .populate('hauls')
    .select('image firstName lastName');

  const playersRes = players.filter((player) => player.hauls.length !== 0);

  res.status(200).json({
    status: 'success',
    numOfPlayers: playersRes.length,
    data: {
      playersRes,
    },
  });
});

exports.createHaul = catchAsyncErrors(async (req, res, next) => {
  if (!req.body.player) req.body.player = req.params.playerId;
  const newHaul = await Haul.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      haul: newHaul,
    },
  });
});

exports.updateHaul = catchAsyncErrors(async (req, res, next) => {
  const haulToUpdate = await Haul.findOneAndUpdate(
    { _id: req.params.haulId },
    req.body,
    { new: true, runValidators: true }
  );

  if (!haulToUpdate) {
    return next(new AppError('That Match haul does not exist!', 404));
  }

  await haulToUpdate.save();

  res.status(200).json({
    status: 'success',
    data: {
      haul: haulToUpdate,
    },
  });
});

exports.deleteHaul = catchAsyncErrors(async (req, res, next) => {
  const haulToDelete = await Haul.findOneAndDelete({
    _id: req.params.haulId,
  });

  if (!haulToDelete) {
    return next(new AppError('That Match haul does not exist!', 404));
  }

  res.status(204).json({
    status: 'Success',
    data: null,
  });
});
