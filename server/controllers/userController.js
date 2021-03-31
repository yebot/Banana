const { User, Session } = require('../models/bananaModels');

const passport = require('passport');
//const GitHubStrategy = require('passport-github2').Strategy;
//const OAuth2Strategy = require('passport-oauth2').OAuth2Strategy;
//const GITHUB_CLIENT_ID = "074859348569d2c07784";
//const GITHUB_CLIENT_SECRET = "lR8ABQUp5B9y8RcMUiqPgmeqGKkN1bCFjolv";

const userController = {};

//userController.authGithub = (req, res, next) => {
//  console.log(' we are in userController.authGithub');
//  //console.log(` this is GitHubStrategy ${GitHubStrategy}`);
//  passport.authenticate('github', { scope: [ 'user:email' ] });

//  //console.log(passport);
//  //next();
//}

//userController.authGithubCallback = (req, res, next) => {
//  //passport.authenticate('github2', { failureRedirect: '/' }),
//  //function(req, res) {
//  //  // Successful authentication, redirect home.
//  //  console.log('Successful authentication, redirect home.');
//  //  res.redirect('/');
//  //};
//};

userController.createOrUpdateUser = (req, res, next) => {
  // write code here
  console.log(' here we are in userController.createOrUpdateUser');
  next();
};

userController.isLoggedIn = (req, res, next) => {
  // write code here
  next();
};

userController.startSession = (req, res, next) => {
  //write code here
  next();
};

userController.setSSIDCookie = (req, res, next) => {
  const newSession = { user: 'homeboy' };
  const session = new Session(newSession);
  session.save()
    .then((data) => {
      res.locals = data;
      next();
    })
    .catch(err => {
      console.log(err);
      next({
        log: `Unable to save session - ${err}`,
        status: 500,
        message: { err: 'Unable to save new session' },
      });
    });
  res.cookie('ssid', res.locals.mongoUserId, { 
    httpOnly: true,
    secure: true,
    maxAge: 1000*60*60*24*7
  });
}

module.exports = userController;