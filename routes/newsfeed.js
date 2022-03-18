const express = require('express');
const { route } = require('express/lib/application');
const router = express.Router();

const userController = require('../controllers/users_controllers');

router.get('/newsfeed' , userController.newsfeed);

module.exports = router;