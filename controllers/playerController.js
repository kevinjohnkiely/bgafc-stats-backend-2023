const Player = require('../models/playerModel');
const catchAsyncErrors = require('../utils/catchAsyncErrors');
const AppError = require('../utils/errorHandling/appError');

exports.getAllPlayers = catchAsyncErrors(async (req, res, next) => {
  const players = await Player.find();
  res.status(200).json({
    status: 'success',
    numOfPlayers: players.length,
    data: {
      players,
    },
  });
});

exports.getOnePlayer = catchAsyncErrors(async (req, res, next) => {
  /*!! CHANGE THIS BACK FOR MY VERSION !! */
  const player = await Player.findOne({ slug: req.params.playerSlug });
  // const player = await Player.findById(req.params.playerSlug);

  if (!player) {
    return next(new AppError('That Player does not exist!', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      player: player,
    },
  });
});

exports.createPlayer = catchAsyncErrors(async (req, res, next) => {
  const newPlayer = await Player.create(req.body);

  if (!newPlayer) {
    return next(
      new AppError('Error creating new player, please try again later!', 404)
    );
  }

  res.status(201).json({
    status: 'success',
    data: {
      player: newPlayer,
    },
  });
});

exports.updatePlayer = catchAsyncErrors(async (req, res, next) => {
  const playerToUpdate = await Player.findOneAndUpdate(
    { slug: req.params.slug },
    req.body,
    { new: true, runValidators: true }
  );

  if (!playerToUpdate) {
    return next(new AppError('That Player does not exist!', 404));
  }

  await playerToUpdate.save();

  res.status(200).json({
    status: 'success',
    data: {
      player: playerToUpdate,
    },
  });
});

exports.deletePlayer = catchAsyncErrors(async (req, res, next) => {
  const playerToDelete = await Player.findOneAndDelete({
    slug: req.params.slug,
  });

  if (!playerToDelete) {
    return next(new AppError('That Player does not exist!', 404));
  }

  res.status(204).json({
    status: 'Success',
    data: null,
  });
});
