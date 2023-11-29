const Hattrick = require('../models/hattricksModel');
const Season = require('../models/seasonModel');
const catchAsyncErrors = require('../utils/catchAsyncErrors');
const AppError = require('../utils/errorHandling/appError');

exports.getAllHattricks = catchAsyncErrors(async (req, res, next) => {
  // const hattricks = await Hattrick.find();
  // const hattricks = await Hattrick.aggregate([
  //   {
  //     $group: { _id: '$player' },
  //   },
  // ])

  const hattricks = await Hattrick.find();

  res.status(200).json({
    status: 'success',
    numOfHattricks: hattricks.length,
    data: {
      hattricks,
    },
  });
});

exports.getHattricksByPlayer = catchAsyncErrors(async (req, res, next) => {
  const seasons = await Season.find({ player: req.params.playerId });

  res.status(200).json({
    status: 'success',
    numOfHattricks: hattricks.length,
    data: {
      seasons,
    },
  });
});

exports.createHattrick = catchAsyncErrors(async (req, res, next) => {
  // For nested routes
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
  const seasonToUpdate = await Season.findOneAndUpdate(
    { _id: req.params.seasonId },
    req.body,
    { new: true, runValidators: true }
  );

  if (!seasonToUpdate) {
    return next(new AppError('That Season does not exist!', 404));
  }

  await seasonToUpdate.save();

  res.status(200).json({
    status: 'success',
    data: {
      season: seasonToUpdate,
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
