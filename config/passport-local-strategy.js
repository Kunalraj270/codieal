// Import passport
const passport = require('passport');
// Import local passport
const LocalStrategy = require('passport-local').Strategy;
// import user
const User = require('../models/user');

// Authication to user
passport.use(new LocalStrategy({
    // defining usernameField 
        usernameField: 'email',
        passReqToCallback : true
    },
    function (req , email, password, done) { // done is a call back function which reporting back to passport.js!!
        // find a user and establish identity
        User.findOne({ email: email }, function (err, user) {
            if (err) {
                req.flash('error' , err);
                return done(err);
            }
            //Checking if user is not found and user password is does't match which is  entered by them
            if (!user || user.password != password) {
                req.flash('error' ,'Invalid UserName/password!!');
                return done(null, false); //Null means there is no error
            }
            //if user found then pass to the user
            return done(null, user);
        });
    }
));

// serializing the user to decide which key is kept in cookies
//serializing --> Telling cookies to save user id not save the rest of information
passport.serializeUser(function(user, done) {
    done(null,user.id);
});

// deserializing the user from the key in cookies
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        if (err) {
            console.log('Error in finding User -->passport');
            return done(err);
        }
        return done(null, user);//null is because user is found
    });
});

// Check if user is authencated
// this function using in middleware
passport.checkAuthentication = function (req, res, next) {
    // if the usere singed in then pass on the request to the next function( action controller)
    if (req.isAuthenticated()) {
        return next();
    }
    // if the user not signed in
    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser = function (req, res, next) {
    if (req.isAuthenticated()) {
        // req.user contain the current signed in user from the session cookies and just we are sending to locals for the local
        res.locals.user = req.user;
    }
    next();
}
module.exports = passport;
// module.exports = LocalStratgy;