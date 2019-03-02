const User = require('../models/user');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

module.exports = function(passport) {
  passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function(user, done) {
    done(null, user);
  });
  
  passport.use(new GoogleStrategy({
    clientID: '350238148627-6u0qtvto3ikpotims4l6o9n1povtmgr2.apps.googleusercontent.com',
    clientSecret: 'Dke3cCw1x9iAX7gqh8TwLT7N',
    callbackURL: "/auth/google/callback/"
  },
  function(accessToken, refreshToken, profile, done) {
       User.findOne({ googleId: profile.id }, function (err, user) {
        console.log(user);
        if (!user) {
          user = new User({
            googleId: profile.id,
            displayName: profile.displayName
          });
          user.save(err => {
            if (err) console.log(err);
            return done(err, user);
          })
        } 
        return done(err, user);
       });
    }
  ));
}