const express = require('express');
const router = express.Router();

const userController = require('../controllers/users_controllers');

router.get('/friends' ,  userController.friends);

module.exports = router;