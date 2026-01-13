/**
 * ============================
 * ENVIRONMENT CONFIGURATION
 * ============================
 */
require('dotenv-flow').config({
  node_env: process.argv[2] || '',
});
import * as cors from "cors";
import { CorsOptionsDelegate } from "cors";
import 'dotenv/config';

/**
 * ============================
 * IMPORTS
 * ============================
 */
import express = require('express');
import path = require('path');
const expressSession = require('express-session');
const pgSession = require('connect-pg-simple')(expressSession);
import { Pool } from 'pg';
import { passportLocal } from './config/passport-local';
import { logger } from "./utils/logger";

/**
 * ============================
 * APP INITIALIZATION
 * ============================
 */
const app = express();
const port = process.env.PORT || 9090;

/**
 * ============================
 * POSTGRESQL CONNECTION
 * ============================
 */
const poolConfigOpts = {
  connectionString: process.env.DATABASE_URL,
}
const poolInstance = new Pool(poolConfigOpts);

const postgreStore = new pgSession({
  pool: poolInstance,
  tableName: 'session',
  createTableIfMissing: true,
});

/**
 * ============================
 * CORS - MUST BE FIRST
 * ============================
 */
const allowedOrigins = [
  "https://dooto.onrender.com",
  "http://localhost:3000",
];

const corsOptions: CorsOptionsDelegate = (req, callback) => {
  const origin = req.headers.origin as string | undefined;

  if (!origin || allowedOrigins.includes(origin)) {
    callback(null, {
      origin: true,
      credentials: true,  // important for session cookies
    });
  } else {
    callback(new Error("Not allowed by CORS"));
  }
};
app.use(cors(corsOptions)); // <-- FIRST THING: use CORS middleware BEFORE sessions!

/**
 * ============================
 * SESSION STORE CONFIGURATION
 * ============================
 */
app.use(expressSession({
    store: postgreStore,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 },
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    // optionally set these for production secure cookies:
    // cookie: {
    //   secure: process.env.NODE_ENV === 'production', 
    //   sameSite: 'lax',
    // },
}));

app.use(passportLocal.initialize());
app.use(passportLocal.session());

/**
 * ============================
 * BODY PARSERS
 * ============================
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * ============================
 * LOGGING SESSION & REQUESTS (OPTIONAL DEBUG)
 * ============================
 */
app.use((req, res, next) => {
  logger.info('Request:', req.method, req.path);
  logger.info('Origin:', req.headers.origin);
  logger.info('Session user:', (req.session as any)?.passport?.user);
  next();
});

/**
 * ============================
 * AUTHENTICATION GUARD (OPTIONAL)
 * ============================
 */
// Uncomment and place here to protect all routes below:
// app.use((req, res, next) => {
//   if (req.session?.passport?.user) {
//     return next();
//   }
//   res.status(401).json({ message: 'Unauthorized' });
// });

/**
 * ============================
 * ROUTES
 * ============================
 */
app.use('/', require('./lib/swagger'));
app.use('/', require('./routes/client.routes'));
app.use('/users', require('./routes/user.routes'));
app.use('/tasks', require('./routes/tasks.routes'));
app.use('/task', require('./routes/task.routes'));
app.use('/habit', require('./routes/habit.routes'));
app.use('/badhabit-timer', require('./routes/badhabit.routes'));
app.use('/mood-journal', require('./routes/moodjournal.routes'));

/**
 * ============================
 * STATIC FILES
 * ============================
 */
app.use(express.static(path.join(__dirname, '/public')));

/**
 * ============================
 * SESSION TEST ROUTE
 * ============================
 */
app.get('/session-test', (req: any, res: any) => {
  res.json({
    sessionID: req.sessionID,
    session: req.session,
  });
});

/**
 * ============================
 * SERVER START
 * ============================
 */
app.listen(port, () => {
  poolInstance
    .query('SELECT 1')
    .then(() => console.log('PostgreSQL connected'))
    .catch((err) => console.error('PostgreSQL connection failed', err));

  console.log(
    `App is on ${
      process.argv[2]?.split('=')[1]?.toUpperCase() || 'OFFICIAL'
    } environment`
  );
  console.log(`App listening on port ${port}`);
});
