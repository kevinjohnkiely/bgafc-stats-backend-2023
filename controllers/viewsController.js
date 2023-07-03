const Player = require('../models/playerModel');
const catchAsyncErrors = require('../utils/catchAsyncErrors');

exports.getPlayers = catchAsyncErrors(async (req, res) => {
  // 1 - get players data
  const players = await Player.find();

  // 2 - build template

  // 3 - render template using player data from step 1
  res.status(200).render('players', {
    title: 'All Players',
    players,
  });
});

exports.getPlayer = catchAsyncErrors(async (req, res) => {
  const player = await Player.findOne({ slug: req.params.slug }).populate(
    'seasons'
  );
  res.status(200).render('player', {
    title: 'Player One',
    player,
  });
});
