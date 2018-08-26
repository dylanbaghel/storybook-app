const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');

//CUSTOM MODULE FILES
const keys = require('./keys');

const passportGoogle = (passport) => {
    passport.use(new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback',
        proxy: true
    }, (accessToken, refreshToken, profile, done) => {
        console.log(accessToken);
        console.log(profile); 
    }));
};

module.exports = { passportGoogle };