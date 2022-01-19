const express = require('express');
const router = express.Router();
//Profile controller
const profileController = require('../controllers/users_controllers');

router.get('/profile' , profileController.profile);


module.exports = router;