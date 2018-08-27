//THIRD PARTY MODULES
const express = require('express');
const router = express.Router();
const passport = require('passport');

//CUSTOM MODULES FILES


//Routes

//GET - /auth/google - AUTH FOR GOOGLE +
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

//GET - /auth/google/callback
router.get('/google/callback',
    passport.authenticate('google',
        { failureRedirect: '/' }),
    (req, res) => {
        //SUCCESSFULL AUTHENTICATION   
        res.redirect('/dashboard');
    });

router.get('/verify', (req, res) => {
    if(req.isAuthenticated()) {
        console.log('Auth');
    } else {
        console.log('Not Auth');
    }
});

//GET - /auth/logout - LOGOUT CURRENT USER
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;