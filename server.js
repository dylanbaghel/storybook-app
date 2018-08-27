require('./config/config');
//THIRD PARTY MODULES
const express = require('express');
const app = express();
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');
//CUSTOM MODULE FILES
const { mongoose } = require('./db/mongoose');
const auth = require('./routes/auth');
require('./config/passport').passportGoogle(passport);
//MIDDLEWARES
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

//GLOBAL VARIABLES
app.use((req, res, next) => {
    res.locals.user = req.user || null;
    next();
});

//ROUTES
//GET - / - lANDING PAGE ROUTE
app.get('/', (req, res) => {
    res.send('It Works');
});



app.use('/auth', auth);
//LISTEN
app.listen(process.env.PORT, () => console.log('Server At ' + process.env.PORT));