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
  // console.log(player.seasons);

  const filteredSeasons = player.seasons.filter(
    (season) => season.season === req.body.season
  );

  console.log('xxxxxxxxxxxxxx');
  console.log(filteredSeasons);

  let seasonGoals = 0,
    leagueGoals = 0;

  if (filteredSeasons.length === 2) {
    if (filteredSeasons[0].seasonTotalGoalsA) {
      seasonGoals =
        filteredSeasons[0].seasonTotalGoalsA +
        filteredSeasons[1].seasonTotalGoalsB;
    } else {
      seasonGoals =
        filteredSeasons[0].seasonTotalGoalsB +
        filteredSeasons[1].seasonTotalGoalsA;
    }
    leagueGoals = filteredSeasons[0].lge_goals + filteredSeasons[1].lge_goals;
  } else {
    if (filteredSeasons[0].seasonTotalGoalsA) {
      seasonGoals = filteredSeasons[0].seasonTotalGoalsA;
    } else {
      seasonGoals = filteredSeasons[0].seasonTotalGoalsB;
    }
    leagueGoals = filteredSeasons[0].lge_goals;
  }

  req.body.totalGoals = seasonGoals;
  req.body.leagueGoals = leagueGoals;
  req.body.firstName = player.firstName;
  req.body.lastName = player.lastName;

  const newSeasonBySeason = await SeasonBySeason.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      season: newSeasonBySeason,
    },
  });
});
