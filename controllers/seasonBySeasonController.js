const catchAsyncErrors = require('../utils/catchAsyncErrors');
const SeasonBySeason = require('../models/seasonBySeasonModel');
const Player = require('../models/playerModel');

exports.getSeasonBySeasonTopScorers = catchAsyncErrors(
  async (req, res, next) => {
    const sbs = await SeasonBySeason.find().populate('sbs_player_info').populate('season_info');

    res.status(200).json({
      status: 'success',
      numOfSeasonBySeasons: sbs.length,
      data: {
        sbs,
      },
    });
  }
);

exports.createSeasonBySeason = catchAsyncErrors(async (req, res, next) => {
  if (!req.body.player) req.body.player = req.params.playerId;
  const player = await Player.findById(req.body.player).populate('seasons');

  const filteredSeasons = player.seasons.filter(
    (season) => season.season === req.body.season
  );

  req.body.seasonRef = filteredSeasons;

  const newSeasonBySeason = await SeasonBySeason.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      season: newSeasonBySeason,
    },
  });
});

exports.updateSeasonBySeason = catchAsyncErrors(async (req, res, next) => {
  // MAY BE ADDED LATER - little use for this function as application stands.
});

exports.deleteSeasonBySeason = catchAsyncErrors(async (req, res, next) => {
  const sbsToDelete = await SeasonBySeason.findOneAndDelete({
    _id: req.params.sbsId,
  });

  if (!sbsToDelete) {
    return next(
      new AppError('That Season by Season record does not exist!', 404)
    );
  }

  res.status(204).json({
    status: 'Success',
    data: null,
  });
});
