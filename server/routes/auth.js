const express = require('express');
const passport = require('passport');
const router = express.Router();

// @desc    Authorize with Github
// @router  GET /auth/github
router.get('/github', passport.authenticate('github', { scope: [] }));

// @desc    Callback Authorize with Github
// @router  GET /auth/github/callback
router.get(
  '/github/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  (req, res) => {
    console.log(' ** handling redirect in /github/auth/callback ');
    res.redirect('/')
  }
)


//router.get(
//  '/github/callback',
//  (req, res) => {
//    console.log(' ** here we are in /github/auth/callback ');

//  }
//)


module.exports = router;