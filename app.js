const express = require('express');
const morgan = require('morgan');

const playerRouter = require('./routes/playerRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// 1) MIDDELWARES
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

app.use((req, res, next) => {
  console.log('herro from miffleware!!');
  next();
});

// 3) ROUTES
app.use('/api/v1/players', playerRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
