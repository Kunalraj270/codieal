const express = require('express');
const router = express.Router();
const passport = require('passport');


// post controller
const postsController = require('../controllers/post_controllers');

router.post('/create' , passport.checkAuthentication, postsController.create);

// delete post route
router.get('/destroy/:id' , passport.checkAuthentication , postsController.destroy);


module.exports = router;