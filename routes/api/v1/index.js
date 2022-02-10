const express = require('express');
const router = express.Router();

router.use('/posts' , require('./posts'));
router.use('/userss' , require('./userss'));



module.exports = router;