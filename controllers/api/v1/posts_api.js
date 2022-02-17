const Post = require('../../../models/post');
const Comment = require('../../../models/comment');
module.exports.index = async function (req , res) {  

    let posts = await Post.find({})
    .sort('-createdAt')
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            },
            populate : {
                path : 'likes'
            },
        }).populate('comments')
        .populate('likes');

    return res.json({
        message : "List of post",
        posts : posts
    });
}



// delelte post action
module.exports.destroy = async function (req, res) {
    //  convet to asyn await
    try {
        let post = await Post.findById(req.params.id);

        if (post.user == req.user.id) {
            post.remove();

            await Comment.deleteMany({ post: req.params.id });

            return res.json(200 , {
                message : 'post associated comment delteted'
            });
            
        } else {
           return res.json(40 , {
               message:"you can't delete this post"
           });
        }

    } catch (error) {
        console.log('******error' , error);
        return res.json(500 , {
            message : 'Internal server error'
        });
    }
}