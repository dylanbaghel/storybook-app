require('./config/config');
//THIRD PARTY MODULES
const express = require('express');
const app = express();

//CUSTOM MODULE FILES
const { mongoose } = require('./db/mongoose');

//MIDDLEWARES
app.use(express.urlencoded({ extended: true }));

//ROUTES
//GET - / - lANDING PAGE ROUTE
app.get('/', (req, res) => {
    res.send('It Works');
});




//LISTEN
app.listen(process.env.PORT, () => console.log('Server At ' + process.env.PORT));