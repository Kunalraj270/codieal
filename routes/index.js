// import express
const express = require('express');

const router = express.Router();
//Home controller
const homeController = require('../controllers/home_controllers');




console.log('Router loaded');
router.get('/' , homeController.home);
router.use('/users' , require('./users'));
router.use('/newsfeed' , require('./newsfeed'))
// For any further routes access from here
router.use('/posts' , require('./posts'));
router.use('/comments' , require('./comments'));
router.use('/likes' , require('./likes'));
router.use('/api' , require('./api'));

module.exports = router;