const Player = require('../models/playerModel');

exports.getAllPlayers = async (req, res) => {
  try {
    const players = await Player.find();
    res.status(200).json({
      status: 'success',
      numOfPlayers: players.length,
      data: {
        players,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getOnePlayer = async (req, res) => {
  try {
    const player = await Player.findOne({ slug: req.params.playerSlug });
    console.log(player, req.params.playerSlug);
    res.status(200).json({
      status: 'success',
      data: {
        player: player,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.createPlayer = async (req, res) => {
  try {
    const newPlayer = await Player.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        player: newPlayer,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.updatePlayer = async (req, res) => {
  try {
    const updatedPlayer = await Player.findOneAndUpdate(
      req.params.slug,
      req.body,
      { new: true, runValidators: true }
    );
    await updatedPlayer.save();
    console.log(updatedPlayer);
    res.status(200).json({
      status: 'success',
      data: {
        player: updatedPlayer,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.deletePlayer = async (req, res) => {
  try {
    await Player.findOneAndDelete(req.params.slug);
    res.status(204).json({
      status: 'Success',
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};
