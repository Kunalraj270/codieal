const express = require('express');
const router = express.Router();
//Profile controller
const usersController = require('../controllers/users_controllers');

router.get('/profile' , usersController.profile);

//Router for sign up and sign in page
router.get('/sign-up', usersController.signUp);
router.get('/sign-in', usersController.singIn);

router.post('/create' , usersController.create);

module.exports = router;