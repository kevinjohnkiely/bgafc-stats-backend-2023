const players = [
    {
      _id: 'asljf39083108908',
      firstName: 'Michael',
      lastName: 'Aherne',
    },
  ];

exports.getAllPlayers = (req, res) => {
  res.status(200).json({
    status: 'success',
    playerTotal: players.length,
    data: {
      players: players,
    },
  });
};

exports.getPlayer = (req, res) => {
  res.status(200).json({
    status: 'success',
    playerTotal: players.length,
    data: {
      players: players,
    },
  });
};

exports.createPlayer = (req, res) => {
  console.log(req.body);
  res.send('Done');
};

exports.updatePlayer = (req, res) => {
  res.status(200).json({
    status: 'Success',
    data: {
      player: 'Updated PLAYER goes here...',
    },
  });
};

exports.deletePlayer = (req, res) => {
  res.status(204).json({
    status: 'Success',
    data: null,
  });
};
