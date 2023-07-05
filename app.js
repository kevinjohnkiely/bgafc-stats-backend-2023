const path = require('path');
const express = require('express');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const compression = require('compression');
const cookieParser = require('cookie-parser');
// const cors = require('cors');

const morgan = require('morgan');
const AppError = require('./utils/errorHandling/appError');
const globalErrorHandler = require('./utils/errorHandling/globalErrorHandler');

const playerRouter = require('./routes/playerRoutes');
const userRouter = require('./routes/userRoutes');
const seasonRouter = require('./routes/seasonRoutes');
const viewRouter = require('./routes/viewRoutes');

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// SERVE STATIC FILES
app.use(express.static(path.join(__dirname, 'public')));

// Implement CORS
// app.use(cors());

// BODY PARSER
app.use(express.json({ limit: '1mb' }));
app.use(cookieParser());
app.use(express.urlencoded({ limit: '1mb', extended: true }));

// DATA SANITIZATION AGAINST NOSQL QUERY INJECTION
app.use(mongoSanitize());

// DATA SANITIZATION AGAINST XSS (CROSS SIDE SCRIPTING)
app.use(xss());

// PREVENT PARAMETER POLLUTION
app.use(hpp());

// LIMITS REQUESTS FROM API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP. Please try again in an hour!',
});
app.use('/api', limiter);

// SET SECURITY HEADERS
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'", 'https:', 'http:', 'data:', 'ws:'],
      baseUri: ["'self'"],
      fontSrc: ["'self'", 'https:', 'http:', 'data:'],
      scriptSrc: ["'self'", 'https:', 'http:', 'blob:'],
      styleSrc: ["'self'", "'unsafe-inline'", 'https:', 'http:'],
    },
  })
);

// COMPRESS TEXT SENT TO CLIENTS
app.use(compression());

// DEVELOPMENT LOGGING
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// TEST MIDDLEWARE
app.use((req, res, next) => {
  console.log(req.cookies);
  next();
});

// MOUNTING THE ROUTES
app.use('/', viewRouter);
app.use('/api/v1/players', playerRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/seasons', seasonRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Cannot find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
