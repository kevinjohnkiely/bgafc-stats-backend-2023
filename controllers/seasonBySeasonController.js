const catchAsyncErrors = require('../utils/catchAsyncErrors');
const SeasonBySeason = require('../models/seasonBySeasonModel');
const Player = require('../models/playerModel');

exports.getSeasonBySeasonTopScorers = catchAsyncErrors(
  async (req, res, next) => {
    // let players;
    // if (req.query.sort) {
    //   players = await Player.find().sort(req.query.sort).populate('seasons');
    // } else {
    //   players = await Player.find().sort({ lastName: 1 }).populate('seasons');
    // }

    const sbs = await SeasonBySeason.find();

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
  console.log(player.seasons);

  const filteredSeason = player.seasons.filter(
    (season) =>
      season.season === req.body.season &&
      season.team === req.body.team &&
      season.division === req.body.division
  );

  if (filteredSeason[0].team === 'A') {
    req.body.totalGoals = filteredSeason[0].seasonTotalGoalsA;
    req.body.leagueGoals = filteredSeason[0].lge_goals;
  } else {
    req.body.totalGoals = filteredSeason[0].seasonTotalGoalsB;
    req.body.leagueGoals = filteredSeason[0].lge_goals;
  }

  const newSeasonBySeason = await SeasonBySeason.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      season: newSeasonBySeason,
    },
  });
});
