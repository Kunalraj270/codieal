// Import passport
const passport = require('passport');
// Import local passport
const LocalStratgey = require('passport-local').Strategy;
// import user
const User = require('../models/user');

// Authication to user
passport.use(new LocalStratgey({
    // defining usernameField 
    usernameField: 'email'
},

    function (email, password, done) { // done is a call back function which reporting back to passport.js!!
        // find a user and establish identity
        User.findOne({ email: email }, function (err, user) {
            if (err) {
                console.log('Error in finding the user --> passport');
                return done(err);
            }
            //Checking if user is not found and user password is does't match which is  entered by them
            if (!user || user.password != password) {
                console.log('Invalid UserName/password!!');
                return done(null, false); //Null means there is no error
            }
            //if user found then pass to the user
            return done(null, user);
        });
    }
));

// serializing the user to decide which key is kept in cookies
//serializing --> Telling cookies to save user id not save the rest of information
passport.serializeUser(function (user, done) {
    done(null, user.id);
})

// deserializing the user from the key in cookies
passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        if (err) {
            console.log('Error in finding User -->passport');
            done(err);
        }
        done(null, user);//null is because user is found
    });
});

module.exports = passport;