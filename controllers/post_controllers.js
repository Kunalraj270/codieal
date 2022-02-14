const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = async function (req, res) {
    // convert to asyn await

    try {
        let post = await Post.create({
            content: req.body.content,
            user: req.user._id
        });
        
        if (req.xhr){
            // if we want to populate just the name of the user (we'll not want to send the password in the API), this is how we do it!
            post = await post.populate('user', 'name').execPopulate();
            return res.status(200).json({
                data: {
                    post: post
                },
                message: "Post created!"
            });
        }


        req.flash('success' , 'Post Published!');
        return res.redirect('back');
    } catch (error) {
        req.flash('error' , err);
        return res.redirect('back');
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

            if(req.xhr){
                return res.status(200).json({
                    data:{
                        post_id : req.params.id
                    },
                    message : 'delete post'
                });
            }

            req.flash('success' , 'Post associated comment deleted!')
            return res.redirect('back');
        } else {
            req.flash('error' , 'You can not delelte this post!')
            return res.redirect('back');
        }

    } catch (error) {
        req.flash('error' , err);
        return res.redirect('back');
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


