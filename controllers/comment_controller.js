const Comment = require('../models/comment');
const Post = require('../models/post');
const { post } = require('../routes/posts');

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

//Comment delete action

module.exports.destroy = function(req , res){
    Comment.findById(req.params.id , function(err , comment){
        if(comment.user == req.user.id){

            let postId = comment.post;
            // Comment.deleteMany({ post: req.params.id }, function (err) {
            //     return res.redirect('back');
            // });

            comment.remove();

            Post.findByIdAndUpdate(postId , {$pull :{comments : req.params.id}} , function(err){
               return res.redirect('back'); 
            });
        }else{
            return redirect('back');
        }
    })
}