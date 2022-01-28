const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = function (req, res) {
    // Checking if post exist or not 
    Post.findById(req.body.post, function (err, post) {
        // if post exist then comment
        if (post) {
            Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            }, function (err, comment) {
                if (err) {
                    console.log('err');
                }
                post.comments.push(comment);
                post.save();
                return res.redirect('/')
            });
        }
    });
}