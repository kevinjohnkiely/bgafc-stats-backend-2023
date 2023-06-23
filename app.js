const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const compression = require('compression');
const cors = require('cors');

const morgan = require('morgan');
const AppError = require('./utils/errorHandling/appError');
const globalErrorHandler = require('./utils/errorHandling/globalErrorHandler');

const playerRouter = require('./routes/playerRoutes');
const userRouter = require('./routes/userRoutes');
const seasonRouter = require('./routes/seasonRoutes');

const app = express();

// Implement CORS
app.use(cors());

// BODY PARSER
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ limit: '1mb', extended: true }));

// DATA SANITIZATION AGAINST NOSQL QUERY INJECTION
app.use(mongoSanitize());

// DATA SANITIZATION AGAINST XSS (CROSS SIDE SCRIPTING)
app.use(xss());

// PREVENT PARAMETER POLLUTION
app.use(hpp());

// LIMITS REQUESTS FROM API
const limiter = rateLimit({
  max: 50,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP. Please try again in an hour!',
});
app.use('/api', limiter);

// SET SECURITY HEADERS
app.use(helmet());

// COMPRESS TEXT SENT TO CLIENTS
app.use(compression());

// SET UP SESSIONS
const DB = process.env.DATABASE.replace(
  '<THE_PASSWORD>',
  process.env.DATABASE_PASSWORD
);

// app.set('trust proxy', 1);
// app.enable('trust proxy', true);

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    // proxy: true,
    saveUninitialized: false,
    name: 'bgafc-session-cookies',
    cookie: {
      maxAge: 60 * 60 * 1000 * 2,
      // secure: false,
    },
    rolling: true,
    store: MongoStore.create({
      mongoUrl: DB,
    }),
  })
);

// DEVELOPMENT LOGGING
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
// app.use(express.static(`${__dirname}/public`))

// MOUNTING THE ROUTES
app.use('/api/v1/players', playerRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/seasons', seasonRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Cannot find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
