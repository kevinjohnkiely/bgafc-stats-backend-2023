const Player = require('../models/playerModel');
const Season = require('../models/seasonModel');
const catchAsyncErrors = require('../utils/catchAsyncErrors');
const AppError = require('../utils/errorHandling/appError');

exports.getPlayers = catchAsyncErrors(async (req, res, next) => {
  const players = await Player.find().sort({ lastName: 1 });

  res.status(200).render('players', {
    title: 'All Players',
    players,
  });
});

exports.getPlayersSorted = catchAsyncErrors(async (req, res, next) => {
  const players = await Player.find().sort(req.params.sorter);

  res.status(200).render('players', {
    title: 'All Players',
    players,
  });
});

exports.getPlayersSearch = catchAsyncErrors(async (req, res, next) => {
  // db.collection.find({name:{'$regex' : req.params.term, '$options' : 'i'}})
  const players = await Player.find({
    lastName: { $regex: req.params.term, $options: 'i' },
  });

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

// SEASONS
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
  const player = await Player.findOne({ slug: req.params.playerSlug });

  if (!season) {
    return next(new AppError('There is no season with that ID!', 404));
  }

  res.status(200).render('updateseason', {
    title: 'Update Season',
    season,
    player,
  });
});

// SHARPSHOOTERS
exports.getSharpshooters = catchAsyncErrors(async (req, res, next) => {
  const ssPlayers = await Player.find({
    totalGoals: { $gte: 50 },
  }).sort({ totalGoals: -1 });

  res.status(200).render('sharpshooters', {
    title: 'Sharpshooters',
    ssPlayers,
  });
});

exports.addSharpshooter = catchAsyncErrors(async (req, res, next) => {
  res.status(200).render('addsharpshooter', {
    title: 'Add New Sharpshooter',
  });
});

// HAT-TRICKS
exports.addHattrick = catchAsyncErrors(async (req, res, next) => {
  const player = await Player.findById(req.params.playerId);

  if (!player) {
    return next(new AppError('There is no player under that ID number!', 404));
  }

  res.status(200).render('addseason', {
    title: `Add Hat-trick for Player: ${player.firstName} ${player.lastName}`,
    player,
  });
});

// PROFILE PHOTO
exports.addPhoto = catchAsyncErrors(async (req, res, next) => {
  const player = await Player.findOne({ slug: req.params.slug });

  if (!player) {
    return next(new AppError('There is no player with that slug!', 404));
  }

  res.status(200).render('addphoto', {
    title: 'Add/Edit Player Photo',
    player,
  });
});
