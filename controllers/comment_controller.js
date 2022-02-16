const Comment = require('../models/comment');
const Post = require('../models/post');
const commentsMailer = require('../mailers/comment_mailer');
const queue = require('../config/kue');
const commentEmailWorker = require('../workers/comment_email_worker');
const Like = require('../models/like');

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
            
            // commentsMailer.newComment(comment);
            let job = queue.create('emails' , comment).save(function(err){
                if(err){
                    console.log('error in sendign a queue' , err);
                    return;
                }
                console.log('job enqued', job.id);
            });
            if(req.xhr){
                comment = await comment.populate('user','name email').execPopulate();
                return res.status(200).json({
                    data : { 
                       comment : comment
                    },
                    message : 'comment created'
                })
            }
            
            req.flash('success' , 'Comment Posted')
            return res.redirect('/');
            // return res.redirect('/');
        }

    } catch (error) {
        req.flash('error' , error);
        return;
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
            // delete like associate with like
            await Like.deleteMany({likeable : comment_id , onModel : 'Comment'});
            
            if (req.xhr){
                // send the comment id which was deleted back to the views
                return res.status(200).json({
                    data: {
                        comment_id: req.params.id
                    },
                    message: "Post deleted"
                });
            }
            
            req.flash('success' , 'Comment Deleted!');
            return res.redirect('back');
        } else {
            req.flash('error' , 'You cannot comment on this Post');
            return redirect('back');
        }
    } catch (error) {
        req.flash('error' , error);
        return;
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