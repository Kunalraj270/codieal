const Posts = require('../../../models/post');
const Comment = require('../../../models/comment');
module.exports.index = async function (req , res) {  

    let posts = await Posts.find({})
    .sort('-createdAt')
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        });

    return res.json({
        message : "Lists of post",
        posts : posts
    });
}



// delelte post action
module.exports.destroy = async function (req, res) {
    //  convet to asyn await
    try {
        let post = await Posts.findById(req.params.id);

        // if (post.user == req.user.id) {
            post.remove();

            await Comment.deleteMany({ post: req.params.id });

            return res.json(200 , {
                message : 'post associated comment delteted'
            });
            
        // } else {
        //     req.flash('error' , 'You can not delelte this post!')
        //     return res.redirect('back');
        // }

    } catch (error) {
        console.log('******error' , error);
        return res.json(500 , {
            message : 'Internal server error'
        });
    }
}