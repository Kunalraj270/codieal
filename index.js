const express = require('express');
//cookies parser
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
//import db
const db = require('./config/mongoose');

//used for session cookies
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');

app.use(express.urlencoded());
app.use(cookieParser());


//Use for assets
app.use(express.static('./assets'));
//layouts
app.use(expressLayouts);


//extract style and script from sub page into layout
app.set('layout extractStyles' , true);
app.set('layout extractScripts' , true);


//Use express router
app.use('/',require('./routes/index'));
app.use('/',require('./routes/index'));



//set up the view engine

app.set('view engine' , 'ejs');
app.set('views' , './views');

// Middleware
app.use(session({
    name : 'codieal',
    // TODO to set secret before deployment into production level
    secret : 'helloWorld',
    saveUninitialized : false,
    resave : false,
    cookie : {
        maxAge : (1000 * 60 * 100)
    }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

//Use express router
app.use('/',require('./routes/index'));





app.listen(port , function(err){
    if(err){
        // console.log('error' , err)
        //Interpolation
        console.log(`Error is running in server: ${err}`);
    }
    console.log(`Server is running on port: ${port}`);
});