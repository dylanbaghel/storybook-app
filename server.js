require('./config/config');

//THIRD PARTY MODULES
const express = require('express');
const app = express();
const methodOverride = require('method-override');
const exphbs = require('express-handlebars');
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const path = require('path');

//CUSTOM MODULE FILES
const { mongoose } = require('./db/mongoose');
const auth = require('./routes/auth');
const stories = require('./routes/stories');
const { authenticate, guest } = require('./middleware/authenticate');
require('./config/passport').passportGoogle(passport);
const { Story } = require('./models/Story');

//HANDLE BAR HELPERS
const { truncate, stripTags, formatDate, editIcon } = require('./helpers/hbs');

//MIDDLEWARES
app.use(express.static(path.join(__dirname, 'public')));
app.engine('handlebars', exphbs({
    defaultLayout: 'main',
    helpers: {
        truncate: truncate,
        stripTags: stripTags,
        formatDate: formatDate,
        editIcon: editIcon
    }
}));
app.use(methodOverride('_method'));
app.set('view engine', 'handlebars');
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
app.get('/', guest,  (req, res) => {
    res.render('index');
});

//GET - /dashboard - DASHBOARD PAGE ROUTE
app.get('/dashboard', authenticate, (req, res) => {
    Story.find({
        _creator: req.user._id
    }).then((stories) => {
        res.render('dashboard', { stories });
    });
});

//GET - /about - GET ABOUT PAGE
app.get('/about', (req, res) => {
    res.render('about');
});


app.use('/stories', stories);
app.use('/auth', auth);
//LISTEN
app.listen(process.env.PORT, () => console.log('Server At ' + process.env.PORT));