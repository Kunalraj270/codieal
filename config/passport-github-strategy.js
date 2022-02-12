const passport = require('passport');
const githubStratgy = require('passport-github2');
const crypto = require('crypto');
const User = require('../models/user');

passport.use(new githubStratgy({
    clientID: "8e51cd4e679ddd854d0a",
    clientSecret: "c8e2f2c2f3bf51f18b9d63ffe7ecf1defb26768f",
    callbackURL: "http://localhost:8000/users/auth/github/callback"
},
// function(accessToken, refreshToken, profile, done) {
//     User.findOrCreate({ githubId: profile.id }, function (err, user) {
//       return done(err, user);
//     });
//   }
    function (accessToken, refreshToken, profile, done) {
        User.findOne({ emails: profile.emails }).exec(function (err, user) {
            if (err) {
                console.log('Error in github passport-startgy', err);
                return;
            }
            console.log(profile);

            if (user) {
                return done(null, user);
            } else {
                User.create({
                    name: profile.displayName,
                    email: profile.email,
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