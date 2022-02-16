const  express = require('express');
const router = express.Router();
const likeConntroller = require('../controllers/likes_controller');

router.post('/toggle' , likeConntroller.toggleLike);

module.exports = router;
