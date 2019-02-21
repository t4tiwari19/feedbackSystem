const passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');

const mongoose = require('mongoose');
// This approach is better than requiring direct User model as many places user model will 
const User = mongoose.model('users');  //be in used a mongoose get confused and create new instances


passport.use(new GoogleStrategy({
    clientID : keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL:'/auth/google/callback',
    proxy:true
  },
   async (accessToken, refreshToken, profile, done) => {
        try {
            const existingUser = await User.findOne({ googleId: profile.id })
            if (existingUser) return done(null, existingUser)   // A record has already been created with this ID 
            const newUser = await User.create({ googleId: profile.id })     // No record found with the given id , Crreat a new record
            return done(null, newUser)
          } catch (e) {
            throw e
          }
    }
));  

passport.serializeUser((user,done) => {
    // Here user is representing user model we created, and user is pulled out of database
    //user.id representing id created by MongoDB automatically for uniquely identify that perticular record.
    // We are using mongoDB user id not googleID coz we can't assume that user will sign in with google account as there are many other authentication providers.
    done(null,user.id);
});

passport.deserializeUser((id,done)=>{
    User.findById(id)
    .then( user => {
        done(null, user);
    })
});


