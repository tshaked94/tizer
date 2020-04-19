const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys');
const User = require('../models/User');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    });
});

passport.use(new FacebookStrategy({
    clientID: keys.facebookAuth.clientID,
    clientSecret: keys.facebookAuth.clientSecret,
    callbackURL: keys.facebookAuth.callbackURL
  },
  function(accessToken, refreshToken, profile, done) {
      process.nextTick(function(){
        User.findOne({'facebook.id': profile.id}, function(err, user){
            if(err){
                return done(err);
            }
            if(user){
                return done(null, user);
            }else{
                var newUser = new User();
                newUser.facebook.id = profile.id;
                newUser.facebook.token = accessToken;
                newUser.facebook.name = profile.name.givenName + ' ' + profile.name.familyName;
                newUser.facebook.name = profile.email[0].value;

                newUser.save(function(err){
                    if(err){
                        throw err;
                    }
                    return done(null, newUser);
                })
            }
        });
      });
  }
));

passport.use(
    new GoogleStrategy({
        //options for the strategy
        callbackURL: '/auth/google/redirect',
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret
    }, (accessToken, refreshToken, profile, done) => {
        //passport callback function
        //check if user already exists in our DB
        User.findOne({ googleID: profile.id }).then((currentUser) => {
            if (currentUser) {
                // user is already registered
                console.log('user is: ', currentUser);
                done(null, currentUser);
            } else {
                // first login - create new user and register on the DB
                new User({
                    username: profile.displayName,
                    email: profile.email,
                    googleID: profile.id,
                }).save.then((newUser) => {
                    console.log('New user created ' + newUser);
                    done(null, newUser);
                })
            }
        });
    })
);