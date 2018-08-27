const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');

//CUSTOM MODULE FILES
const keys = require('./keys');
const { User } = require('./../models/User');

const passportGoogle = (passport) => {
    passport.use(new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback',
        proxy: true
    }, (accessToken, refreshToken, profile, done) => {
        // console.log(accessToken);
        // console.log(profile); 
        const image = profile.photos[0].value.substring(0, profile.photos[0].value.indexOf('?'));
        const newUser = {
            googleID: profile.id,
            email: profile.emails[0].value,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            image: image
        };

        //CHECK FOR EXISTING USER
        User.findOne({
            googleID: profile.id
        }).then((user) => {
            if (user) {
                done(null, user);
            } else {
                //CREATE USER
                let user = new User(newUser);
                user.save().then(user => done(null, user));
            }
        })
    }));

    passport.serializeUser((user, done) => {
        return done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });
};

module.exports = { passportGoogle };