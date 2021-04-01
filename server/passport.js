const GitHubStrategy = require('passport-github2').Strategy;
const { User, Session } = require('./models/bananaModels');

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

module.exports = function(passport) {
  passport.use(new GitHubStrategy(
    {
      clientID: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      callbackURL: '/auth/github/callback'
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log(`THE PROFILE IS ${profile}`);
      // TODO: add save to db code ehre
      const newUser = {
        githubId: profile.id,
        githubAccessToken: accessToken,
        oauthProfile: profile
      };
      try {
        let user = await User.findOne({ githubId: profile.id});
        if(user) {
          done(null, user);
        } else {
          user = await User.create(newUser);
          done(null, user);
        }
      } catch (err) {
        console.log(`error saving user to db - ${err}`);
      }
    }
  ));
  passport.serializeUser(function(user, done) {
    done(null, user);
  });
  passport.deserializeUser(function(obj, done) {
    done(null, obj);
  });
} 


//passport.use(new GitHubStrategy(
//  {
//    clientID: GITHUB_CLIENT_ID,
//    clientSecret: GITHUB_CLIENT_SECRET,
//    //callbackURL: "http://localhost:8080/api/auth/github/callback"
//  },
//  function(accessToken, refreshToken, profile, done) {
//    const newUser = new User({
//      githubId: profile.id,
//      githubAccessToken: accessToken,
//      oauthProfile: profile
//    });
//    newUser.save(function (err, data) {
//      done(err, data);
//    });
//  }
//));