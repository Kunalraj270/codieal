const passport = require('passport');
const googleSratergy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');

// tell passprot to use new startgy for google sign in 
passport.use(new googleSratergy({
    clientID: "802198501272-4msfqb0q6d06a64af4k11b6hi3lstg5e.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:8000/users/auth/google/callback"
},
    function (accessToken, refreshToken, profile, done) {
        // finding the user
        User.findOne({ emails: profile.emails }).exec(function (err, user) {
            if (err) {
                console.log('Error in google passprot-stratgey', err);
                return;
            }
            console.log(profile);
            // if user found then req.user
            if (user) {
                return done(null, user);
                // if not found then create a user in database
            } else {
                User.create({
                    name: profile.displayName,
                    email: profile.emails.value,
                    // crypto is use to generate random password
                    password: crypto.randomBytes(20).toString('hex')
                }, function (err) {
                    if (err) {
                        console.log('Error in google passprot-stratgey', err);
                        return;
                    }
                    return done(null , user);
                });
            }
        });
    }
));


module.exports = passport;