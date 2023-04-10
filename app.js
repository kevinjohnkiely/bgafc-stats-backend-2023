const express = require('express');
const morgan = require('morgan');

const playerRouter = require('./routes/playerRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();
app.use(express.json());
app.use(morgan('dev'));

// ROUTES
app.use('/api/v1/players', playerRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
