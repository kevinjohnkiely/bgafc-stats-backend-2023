const Player = require('../models/playerModel');
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

exports.getLoginForm = (req, res) => {
  res.status(200).render('login', {
    title: 'Login to update stats',
  });
};
