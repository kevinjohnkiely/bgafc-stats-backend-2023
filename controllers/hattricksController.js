const Hattrick = require('../models/hattricksModel');
const Season = require('../models/seasonModel');
const catchAsyncErrors = require('../utils/catchAsyncErrors');
const AppError = require('../utils/errorHandling/appError');
const Player = require('../models/playerModel');

// THIS ROUTE IS NOT USED IN FRONTEND, ONLY FOR POSTMAN TESTING
exports.getAllHattricks = catchAsyncErrors(async (req, res, next) => {
  const hattricks = await Hattrick.find();

  res.status(200).json({
    status: 'success',
    numOfHattricks: hattricks.length,
    data: {
      hattricks,
    },
  });
});

exports.getPlayersWithHattricks = catchAsyncErrors(async (req, res, next) => {
  const players = await Player.find()
    .populate('hattricks')
    .select('image firstName lastName');

  const playersRes = players.filter((player) => player.hattricks.length !== 0);

  res.status(200).json({
    status: 'success',
    numOfPlayers: playersRes.length,
    data: {
      playersRes,
    },
  });
});

exports.createHattrick = catchAsyncErrors(async (req, res, next) => {
  if (!req.body.player) req.body.player = req.params.playerId;
  const newHattrick = await Hattrick.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      hattrick: newHattrick,
    },
  });
});

exports.updateHattrick = catchAsyncErrors(async (req, res, next) => {
  const hattrickToUpdate = await Hattrick.findOneAndUpdate(
    { _id: req.params.hattrickId },
    req.body,
    { new: true, runValidators: true }
  );

  if (!hattrickToUpdate) {
    return next(new AppError('That Hat-trick does not exist!', 404));
  }

  await hattrickToUpdate.save();

  res.status(200).json({
    status: 'success',
    data: {
      hattrick: hattrickToUpdate,
    },
  });
});

exports.deleteHattrick = catchAsyncErrors(async (req, res, next) => {
  const hattrickToDelete = await Hattrick.findOneAndDelete({
    _id: req.params.hattrickId,
  });

  if (!hattrickToDelete) {
    return next(new AppError('That Hat-trick does not exist!', 404));
  }

  res.status(204).json({
    status: 'Success',
    data: null,
  });
});
