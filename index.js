const express = require('express');
require('dotenv').config();
const path = require('path');
const expressLayout = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');
const db = require('./config/mongoose');
const PORT = (process.env.PORT || 8000);
const app = express();


const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo');


app.use(express.static(`${__dirname}/assets`));
// make the uplaods available for browser
app.use('/uploads', express.static(__dirname + '/uploads'));

app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.use(expressLayout);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));




app.use(session({
    name: 'BlogOverflow',
    secret: 'blogoverflowcanresolveoverflow',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000*60*100)
    },
    store: MongoStore.create(
        {
            mongoUrl: 'mongodb://localhost/blogoverflowdb',
            ttl: 14 * 24 * 60 * 60
        },
        function(err){
            console.log(err || 'connect-mongo-db ok');
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);


app.use('/', require('./routes'));

app.listen(PORT, function(err){
    if(err){
        console.log('Error Occured: ', err);
        return res.status(500).json({
            msg: 'Server Error',
            result: false,
            error: err
        });
    }
    console.log('Server is Up and running: ',PORT);
});