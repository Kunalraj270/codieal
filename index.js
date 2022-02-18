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
const passportJwt = require('./config/passport-jwt-strategy');
const passportGoogle = require('./config/passport-google-oauth2-stratgey');
const passportGithub = require('./config/passport-github-strategy');
//connect mongostore to mongo db
const  MongoStore = require('connect-mongo');

const sassMiddleware = require('node-sass-middleware');

// for connect flash
const flash = require('connect-flash');

const customMware = require('./config/middleware');

// set up chat server to be uses with socket.io
const chatServer = require('http').Server(app);
const chatSockets = require('./config/chat_sockets').chatSockets(chatServer);
chatServer.listen(5000);
console.log('chat server is up running on port on 3000');

// we put before server run
app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'expanded',
    prefix: '/css'
}));

app.use(express.urlencoded());
app.use(cookieParser());


//Use for assets
app.use(express.static('./assets'));
// make the upload path for the broweser
app.use('/uploads' , express.static(__dirname + '/uploads'));
//layouts
app.use(expressLayouts);


//extract style and script from sub page into layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);



//Use express router
// app.use('/',require('./routes/index'));

//set up the view engine

app.set('view engine', 'ejs');
app.set('views', './views');


// Middleware
//Mongo store is used to store the session cookies in db
app.use(session({
    name: 'codieal',
    // TODO to set secret before deployment into production level
    secret: 'helloWorld',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    // store :MongoStore.create({ mongoUrl: 'mongodb://localhost/codieal_development' })
    store: MongoStore.create({
        mongoUrl: 'mongodb://localhost/codieal_development',
        autoRemove: 'disabled'
    }, function (err) {
        console.log(err || 'connect-mongodb setup fine');
    })
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);
//  we put the connect flash after session
app.use(flash());
app.use(customMware.setFlash);

//Use express router
app.use('/', require('./routes'));





app.listen(port, function (err) {
    if (err) {
        // console.log('error' , err)
        //Interpolation
        console.log(`Error is running in server: ${err}`);
    }
    console.log(`Server is running on port: ${port}`);
});