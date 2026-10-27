const path = require('node:path');
const express = require('express');
const session = require('express-session');

const passport = require('./config/passport');
const authRouter = require('./routes/authRouter');

const setLocals=require('./middleware/locals');

const { loadEnvFile } = require('node:process');
loadEnvFile(path.join(__dirname, './.env'));

const app = express();

//Configure views
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//Parse incoming request bodies
app.use(express.urlencoded({ extended: true }));

//Serve static assets
const assetsPath = path.join(__dirname, 'public');
app.use(express.static(assetsPath));

//Create/load the session
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'development-only-secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      maxAge: 1000 * 60 * 60 * 24, 
    },
  }),
);

//Initialize passport
app.use(passport.initialize());

//Restore the authenticated user from the session
app.use(passport.session());

app.use(setLocals);

app.use('/', authRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`App running on port ${PORT}`);
});
