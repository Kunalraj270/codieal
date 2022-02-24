const passport = require('passport');
const githubStratgy = require('passport-github2');
const crypto = require('crypto');
const User = require('../models/user');
const env = require('./enviroment')

passport.use(new githubStratgy({
    clientID: env.github_client_id ,
    clientSecret: env.github_client_Secret,
    callbackURL: env.github_callback_URL
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