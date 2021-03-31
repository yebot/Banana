const express = require('express');
const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const userController = require('../controllers/userController');

const router = express.Router();


router.get('/start-session',
  //userController.setSSIDCookie,
  //userController.startSession,
  (req, res) => res.status(200).json(res.locals)
);

//router.get('/auth/github/callback', 
//  userController.authGithubCallback,
//(req, res) => res.status(200).json(res.locals)
//);

router.get('/auth/github/callback', (req, res, next) => {
  passport.authenticate('github', {
    successRedirect: '/',
    failureRedirect: '/api/user/fail'
  })(req, res, next);
});

//router.get(
//  '/auth/github/callback',
//  passport.authenticate('github')
//  //passport.authenticate('github', {
//  //  successRedirect: '/',
//  //  failureRedirect: '/api/user/fail'
//  //})
//);

router.get('/auth/github', passport.authenticate('github', { scope: [] }));

router.get('/fail', (req, res) => res.status(404).json("oauth fail"));

module.exports = router;