const express = require('express');
const router = express.Router();



// post controller
const postsController = require('../controllers/post_controllers');

router.post('/create' , postsController.create);



module.exports = router;