/**
 * ============================
 * ENVIRONMENT CONFIGURATION
 * ============================
 */
require('dotenv-flow').config({
  node_env: process.argv[2] || '',
});
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
 * (Shared DB with Prisma)
 * ============================
 */

const poolConfigOpts = {
  connectionString: process.env.DATABASE_URL,
}
const poolInstance = new Pool(poolConfigOpts);

const postgreStore = new pgSession({
  // check interface PGStoreOptions for more info https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/connect-pg-simple/index.d.ts
  pool: poolInstance,
  tableName: 'session',
  createTableIfMissing: true, // this will create a `session` table if you do not have it yet
})

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
    saveUninitialized: false
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
 * ROUTES
 * ============================
 */
app.use('/', require('./lib/swagger'));
app.use('/', require('./routes/client.routes'));
app.use('/users', require('./routes/user.routes'));
app.use('/tasks', require('./routes/tasks.routes'));


// app.use((req: Request, res: any, next:any) => {
//   if(req.session?.passport?.user !== null) {
//     return next();
//   }
//   return res.status(401).json({ message: 'Unauthorized' });
// });

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
app.get('/session-test', (req:any, res:any) => {
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
