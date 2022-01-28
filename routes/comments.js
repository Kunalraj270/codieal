const express = require('express');
const router = express.Router();
const passport = require('passport');

const Comment = require('../models/comment');

const commentsController = require('../controllers/comment_controller');

router.post('/create' , passport.checkAuthentication, commentsController.create);

module.exports = router;