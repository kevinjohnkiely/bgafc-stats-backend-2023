const Season = require('../models/seasonModel');
const catchAsyncErrors = require('../utils/catchAsyncErrors');
// const AppError = require('../utils/errorHandling/appError');

exports.getAllSeasons = catchAsyncErrors(async (req, res, next) => {
  const seasons = await Season.find();

  res.status(200).json({
    status: 'success',
    numOfSeasons: seasons.length,
    data: {
      seasons,
    },
  });
});

exports.createSeason = catchAsyncErrors(async (req, res, next) => {
  const newSeason = await Season.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      season: newSeason,
    },
  });
});
