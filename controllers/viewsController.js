const Player = require('../models/playerModel');
const Season = require('../models/seasonModel');
const catchAsyncErrors = require('../utils/catchAsyncErrors');
const AppError = require('../utils/errorHandling/appError');

exports.getPlayers = catchAsyncErrors(async (req, res, next) => {
  // 1 - get players data
  const players = await Player.find();

  // 2 - build template

  // 3 - render template using player data from step 1
  res.status(200).render('players', {
    title: 'All Players',
    players,
  });
});

exports.getPlayer = catchAsyncErrors(async (req, res, next) => {
  const player = await Player.findOne({ slug: req.params.slug }).populate(
    'seasons'
  );

  if (!player) {
    return next(new AppError('There is no player by that name!', 404));
  }

  res.status(200).render('player', {
    title: `${player.firstName} ${player.lastName}`,
    player,
  });
});

exports.updatePlayer = catchAsyncErrors(async (req, res, next) => {
  const player = await Player.findOne({ slug: req.params.slug });

  if (!player) {
    return next(new AppError('There is no player by that name!', 404));
  }

  res.status(200).render('updateplayer', {
    title: `Update ${player.firstName} ${player.lastName}`,
    player,
  });
});

exports.getLoginForm = (req, res) => {
  res.status(200).render('login', {
    title: 'Login to update stats',
  });
};

exports.loggedOutInfo = (req, res) => {
  res.status(200).render('loggedout', {
    title: 'User now logged out',
  });
};

exports.addPlayer = (req, res) => {
  res.status(200).render('addplayer', {
    title: 'Add New Player',
  });
};

exports.addSeason = catchAsyncErrors(async (req, res, next) => {
  const player = await Player.findById(req.params.playerId);
  const team = req.params.team;

  if (!player) {
    return next(new AppError('There is no player under that ID number!', 404));
  }

  res.status(200).render('addseason', {
    title: `Add Season Data for Player: ${player.firstName} ${player.lastName}`,
    player,
    team,
  });
});

exports.updateSeason = catchAsyncErrors(async (req, res, next) => {
  const season = await Season.findById(req.params.seasonId);

  if (!season) {
    return next(new AppError('There is no season with that ID!', 404));
  }

  res.status(200).render('updateseason', {
    title: 'Update Season',
    season,
  });
});
