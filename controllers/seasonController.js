const Season = require('../models/seasonModel');
const catchAsyncErrors = require('../utils/catchAsyncErrors');
const AppError = require('../utils/errorHandling/appError');
// const AppError = require('../utils/errorHandling/appError');

exports.getSeasonsByPlayer = catchAsyncErrors(async (req, res, next) => {
  const seasons = await Season.find({ player: req.params.playerId });

  res.status(200).json({
    status: 'success',
    numOfSeasons: seasons.length,
    data: {
      seasons,
    },
  });
});

exports.createSeason = catchAsyncErrors(async (req, res, next) => {
  // For nested routes
  if (!req.body.player) req.body.player = req.params.playerId;
  const newSeason = await Season.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      season: newSeason,
    },
  });
});

exports.updateSeason = catchAsyncErrors(async (req, res, next) => {
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

exports.deleteSeason = catchAsyncErrors(async (req, res, next) => {
  const seasonToDelete = await Season.findOneAndDelete({
    _id: req.params.seasonId,
  });

  if (!seasonToDelete) {
    return next(new AppError('That Season does not exist!', 404));
  }

  res.status(204).json({
    status: 'Success',
    data: null,
  });
});
