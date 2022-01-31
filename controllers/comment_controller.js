const Comment = require('../models/comment');
const Post = require('../models/post');
const { post } = require('../routes/posts');

module.exports.create = async function (req, res) {

    // convert async await 

    try {
        let post = await Post.findById(req.body.post);
        if (post) {
            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });
            post.comments.push(comment);
            post.save();
            return res.redirect('/');
        }

    } catch (error) {
        console.log('Error', err);
    }


    /*
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
    */
}

//Comment delete action

module.exports.destroy = async function (req, res) {
    // Convert to async await

    try {
        let comment = await Comment.findById(req.params.id);
        if (comment.user == req.user.id) {

            let postId = comment.post;
            // Comment.deleteMany({ post: req.params.id }, function (err) {
            //     return res.redirect('back');
            // });

            comment.remove();

            let post = Post.findByIdAndUpdate(postId, { $pull: { comments: req.params.id } });
            return res.redirect('back');
        } else {
            return redirect('back');
        }
    } catch (error) {
        console.log('Error', err);
    }

    /*
    Comment.findById(req.params.id, function (err, comment) {
        if (comment.user == req.user.id) {

            let postId = comment.post;
            // Comment.deleteMany({ post: req.params.id }, function (err) {
            //     return res.redirect('back');
            // });

            comment.remove();

            Post.findByIdAndUpdate(postId, { $pull: { comments: req.params.id } }, function (err) {
                return res.redirect('back');
            });
        } else {
            return redirect('back');
        }
    })
    */
}