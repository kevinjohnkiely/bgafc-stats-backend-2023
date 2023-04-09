const express = require('express');

const app = express();

app.use(express.json());

const getAllPlayers = (req, res) => {
  res.status(200).json({
    status: 'success',
    // results: data.players.length,
    data: {
      players: 'players',
    },
  });
};

const getOnePlayer = (req, res) => {
  res.status(200).json({
    status: 'success',
    // results: data.players.length,
    data: {
      players: 'players',
    },
  });
};

const createPlayer = (req, res) => {};

const updatePlayer = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      player: 'updated player here',
    },
  });
};

const deletePlayer = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null,
  });
};

app.route('/api/v1/players').get(getAllPlayers).post(createPlayer);
app
  .route('/api/v1/players/:playerSlug')
  .get(getOnePlayer)
  .patch(updatePlayer)
  .delete(deletePlayer);

const port = 1984;
app.listen(port, () => {
  console.log('App running on port: ' + port);
});
