const express = require('express');
const morgan = require('morgan');

const app = express();
app.use(express.json());
app.use(morgan('dev'));

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

const getAllUsers = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
};
const createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
};

const getOneUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
};

const updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
};

const deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
};

// ROUTES
const playerRouter = express.Router();
app.use('/api/v1/players', playerRouter);

playerRouter.route('/').get(getAllPlayers).post(createPlayer);
playerRouter
  .route('/:playerSlug')
  .get(getOnePlayer)
  .patch(updatePlayer)
  .delete(deletePlayer);

const userRouter = express.Router();
app.use('/api/v1/users', userRouter);

userRouter.route('/').get(getAllUsers).post(createUser);
userRouter.route('/:id').get(getOneUser).patch(updateUser).delete(deleteUser);

const port = 1984;
app.listen(port, () => {
  console.log('App running on port: ' + port);
});
