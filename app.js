const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');

const morgan = require('morgan');
const AppError = require('./utils/errorHandling/appError');
const globalErrorHandler = require('./utils/errorHandling/globalErrorHandler');

const playerRouter = require('./routes/playerRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();
app.use(express.json());

const DB = process.env.DATABASE.replace(
  '<THE_PASSWORD>',
  process.env.DATABASE_PASSWORD
);

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60 * 60 * 100,
    },
    rolling: true,
    store: MongoStore.create({
      mongoUrl: DB,
    }),
  })
);

console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
// app.use(express.static(`${__dirname}/public`))

// ROUTES
app.use('/api/v1/players', playerRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Cannot find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
