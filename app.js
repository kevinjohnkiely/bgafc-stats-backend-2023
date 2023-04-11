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

app.all('*', (req, res, next) => {
  // res.status(404).json({
  //   status: 'fail',
  //   message: `Cannot find ${req.originalUrl} on this server!`,
  // });
  // next();
  const err = new Error(`Cannot find ${req.originalUrl} on this server!`);
  err.status = 'fail';
  err.statusCode = 404;
  next(err);
});

app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

module.exports = app;
