require('./config/config');
//THIRD PARTY MODULES
const express = require('express');
const app = express();
const passport = require('passport');
//CUSTOM MODULE FILES
const { mongoose } = require('./db/mongoose');
const auth = require('./routes/auth');
require('./config/passport').passportGoogle(passport);
//MIDDLEWARES
app.use(express.urlencoded({ extended: true }));

//ROUTES
//GET - / - lANDING PAGE ROUTE
app.get('/', (req, res) => {
    res.send('It Works');
});



app.use('/auth', auth);
//LISTEN
app.listen(process.env.PORT, () => console.log('Server At ' + process.env.PORT));