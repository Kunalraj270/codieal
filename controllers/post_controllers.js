const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = async function (req, res) {
    // convert to asyn await

    try {
        await Post.create({
            content: req.body.content,
            user: req.user._id
        });
        return res.redirect('back');
    } catch (error) {
        console.log('Error', err);
    }

    /*
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
    */
}



// delelte post action
module.exports.destroy = async function (req, res) {
    //  convet to asyn await
    try {
        let post = await Post.findById(req.params.id);

        if (post.user == req.user.id) {
            post.remove();

            await Comment.deleteMany({ post: req.params.id });
            return res.redirect('back');
        } else {
            return res.redirect('back');
        }

    } catch (error) {
        console.log('Error', err);
    }

    /*
    Post.findById(req.params.id, function (err, post) {
        // .id means converting Object id to string 
        if (post.user == req.user.id) {
            post.remove();

            Comment.deleteMany({ post: req.params.id }, function (err) {
                return res.redirect('back');
            });
        } else {
            return res.redirect('back');
        }
    });
    */
}


