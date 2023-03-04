const express = require('express');
const morgan = require('morgan');

const app = express();

// 1) MIDDELWARES
app.use(morgan('dev'))
app.use(express.json());

app.use((req, res, next) => {
  console.log('herro from miffleware!!');
  next();
});

const players = [
  {
    _id: 'asljf39083108908',
    firstName: 'Michael',
    lastName: 'Aherne',
  },
];

// 2) ROUTE HANDLERS
const getAllPlayers = (req, res) => {
  res.status(200).json({
    status: 'success',
    playerTotal: players.length,
    data: {
      players: players,
    },
  });
};

const getPlayer = (req, res) => {
  res.status(200).json({
    status: 'success',
    playerTotal: players.length,
    data: {
      players: players,
    },
  });
};

const createPlayer = (req, res) => {
  console.log(req.body);
  res.send('Done');
};

const updatePlayer = (req, res) => {
  res.status(200).json({
    status: 'Success',
    data: {
      player: 'Updated PLAYER goes here...',
    },
  });
};

const deletePlayer = (req, res) => {
  res.status(204).json({
    status: 'Success',
    data: null,
  });
};

// 3) ROUTES
app.route('/api/v1/players').get(getAllPlayers).post(createPlayer);
app
  .route('/api/v1/players/:slug')
  .get(getPlayer)
  .patch(updatePlayer)
  .delete(deletePlayer);

// 4) START SERVER
const port = 1984;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
