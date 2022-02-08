const express = require('express');

const router  = express.Router();

router.use('/v1' , require('./v1'));
router.get('/posts' , require('./po'))

module.exports = router;