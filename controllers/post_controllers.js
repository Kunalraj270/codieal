const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = function (req, res) {
    Post.create({
        content: req.body.content,
        user: req.user._id
    }, function (err) {
        if (err) {
            console.log('Error creation in post');
            return;
        }
        return res.redirect('back');
    });
}



// delelte post action
module.exports.destroy = function (req, res) {
    Post.findById(req.params.id, function (err, post) {
        // .id means converting Object id to string 
        if (post.user == req.user.id) {
            post.remove();

            Comment.deleteMany({ post: req.params.id }, function (err) {
                return res.redirect('back');
            });
        }else{
            return res.redirect('back');
        }
    });
}


