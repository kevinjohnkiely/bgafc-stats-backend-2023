exports.getAllPlayers = (req, res) => {
  res.status(200).json({
    status: 'success',
    // results: data.players.length,
    data: {
      players: 'players',
    },
  });
};

exports.getOnePlayer = (req, res) => {
  res.status(200).json({
    status: 'success',
    // results: data.players.length,
    data: {
      players: 'players',
    },
  });
};

exports.createPlayer = (req, res) => {};

exports.updatePlayer = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      player: 'updated player here',
    },
  });
};

exports.deletePlayer = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null,
  });
};
