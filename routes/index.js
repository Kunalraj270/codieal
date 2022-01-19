// import express
const express = require('express');

const router = express.Router();
//Home controller
const homeController = require('../controllers/home_controllers');




console.log('Router loaded');
router.get('/' , homeController.home);
router.use('/users/' , require('./users'));
// For any further routes access from here
router.use('/post' , require('./post'));


module.exports = router;