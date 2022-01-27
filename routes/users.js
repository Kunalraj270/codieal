const express = require('express');
const router = express.Router();
//Import passport
const passport = require('passport');
//Profile controller
const usersController = require('../controllers/users_controllers');

router.get('/profile' , passport.checkAuthentication,usersController.profile);

//Router for sign up and sign in page
router.get('/sign-up', usersController.signUp);
router.get('/sign-in', usersController.singIn);

router.post('/create' , usersController.create);

router.post ('/create-session' , passport.authenticate(
    // Middlewar if the user fail to sign then redirect ot sign-in page
    'local',
    {failureRedirect : '/users/sign-in'},
    // everting is cool then fine
) , usersController.createSession);



router.get('/Sign-Out' , usersController.distroySession);



module.exports = router;