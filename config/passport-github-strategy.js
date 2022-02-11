const passport = require('passport');
const githubStratgy = require('passport-github').Strategy;
const crypto = require('crypto');
const User = require('../models/user');

passport.use(new githubStratgy({
    clientID: "8e51cd4e679ddd854d0a",
    clientSecret: "5d114d7852c53bf77af44ccb2b455d6d028180c8",
    callbackURL: "http://localhost:8000/auth/github/callback"
},
    function (accessToken, refreshToken, profile, done) {
        User.findOne({ emails: profile.emails[0].value }).exec(function (err, user) {
            if (err) {
                console.log('Error in github passport-startgy', err);
                return;
            }
            console.log(profile);
            done(null, user);

            if (user) {
                return done(null, user);
            } else {
                User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex')
                }, function (err) {
                    if (err) {
                        console.log('Error in github passport-startgy', err);
                        return;
                    }
                    return done(null , user);
                });
            }
        });
    }
)); 


module.exports = passport;