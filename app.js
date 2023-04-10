const express = require('express');
const morgan = require('morgan');

const playerRouter = require('./routes/playerRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();
app.use(express.json());

console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
// app.use(express.static(`${__dirname}/public`))

// ROUTES
app.use('/api/v1/players', playerRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
