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

module.exports = router;