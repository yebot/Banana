const express = require('express');
//const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const noteRouter = require('./routes/note');
const userRouter = require('./routes/user');
const { User } = require('./models/bananaModels');

const GITHUB_CLIENT_ID = "8c77f6a2d43001a9a61a";
const GITHUB_CLIENT_SECRET = "a496fe3e546dff0a671b1b01a4d04a2f6d155561";

// Initiate app 
const app = express();

// Passport
passport.use(new GitHubStrategy(
  {
    clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    callbackURL: "http://localhost:8080/api/user/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    console.log(' we are in the the passport.use callback');
    const newUser = {
      githubAccessToken: accessToken,
      githubProfileId: profile._json.id,
      oauthProfile: profile._json
    };
    //console.log(newUser);
    new User(newUser).save();
    return done(null);
  })
);

//var corsOptions = {
//  origin: "http://localhost:8081"
//};
//app.use(cors(corsOptions));

/**
 * handle parsing request body
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
/**
 * define route handlers
 */
app.use('/api/user', userRouter);
app.use('/api/note', noteRouter);
//app.use('/user', userRouter);
//app.use('/api/fail', (req, res) => {
//  res.json({ message: "ummm /api/fail" });
//});


// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to b.a.n.a.n.a. (server.js)" });
});

// catch-all route handler for any requests to an unknown route
app.use((req, res) => res.status(404).send(`404 - This is not the page you're looking for...`));


/**
 * express global error handler
 */
 app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});