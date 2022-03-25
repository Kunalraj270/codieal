const express = require('express');
const router = express.Router();
//Import passport
const passport = require('passport');
//Profile controller
const usersController = require('../controllers/users_controllers');

router.get('/profile/:id', passport.checkAuthentication, usersController.profile);
//Profile update route
router.post('/update/:id', passport.checkAuthentication, usersController.update);

//Router for sign up and sign in page
router.get('/sign-up', usersController.signUp);
router.get('/sign-in', usersController.singIn);

// newsfeed
router.get('/newsfeed' , usersController.newsfeed);

router.get('/friends' , usersController.friends);


router.post('/create-session', passport.authenticate(
    // Middlewar if the user fail to sign then redirect ot sign-in page
    'local',
    { failureRedirect: '/users/sign-in' },
    // everting is cool then fine
), usersController.createSession);

// Router for post 
router.post('/create', usersController.create);

router.get('/Sign-Out', usersController.distroySession);
// google auth route
router.get('/auth/google', passport.authenticate(
    'google', { scope: ['profile', 'email'] }
));
router.get('/auth/google/callback', passport.authenticate(
    'google',
    { failureRedirect: '/users/sign-in' }
), usersController.createSession);
// git hub auth route
router.get('/auth/github',
    passport.authenticate(
        'github', { scope: ['email'] }
    ));

router.get('/auth/github/callback',
    passport.authenticate(
        'github', { failureRedirect: '/users/sign-in' }
        // Successful authentication, redirect home.
    ), usersController.createSession);


module.exports = router;