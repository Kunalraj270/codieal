const Post = require('../models/post');
const Comment = require('../models/comment');
const User = require('../models/user');

module.exports.home = async function (req, res) {
    // return res.end('<h1>Express is up for codieal!!</h1>');
    // console.log(req.cookies);
    // res.cookie('user_id', 1);


    // Post.find({}, function (err, posts) {
    //     if (err) {
    //         console.log('Error fetching contact from db');
    //         return;
    //     }
    //     return res.render('home', {
    //         title: 'Codieal | Home',
    //         posts: posts
    //     });

    // });

    //convert to asyn awiat
    try {
        // Populate the user of each post and convert asyn await
        let posts = await Post.find({})
        .sort('-createdAt')
            .populate('user')
            .populate({
                path: 'comments',
                populate: {
                    path: 'user'
                },
                // changes ++
                populate : {
                    path : 'likes'
                }
            }).populate('comments')
            .populate('likes');



        let users = await User.find({});
        return res.render('home', {
            title: 'Codieal | home',
            posts: posts,
            all_users: users
        });

    } catch (error) {
        console.log('Error', err);
    }

    /*
   Post.find({})
   .populate('user')
   .populate({
       path : 'comments',
       populate : {
           path : 'user'
       }
   })
   .exec(function(err , posts){
       if(err){
           console.log('Error in fetching the post of the user')
       }
        User.find({} , function(err , users){
            return res.render('home' , {
                title: 'Codieal | home',
                posts : posts,
                all_users : users
            })
        })


   });
*/
}

// pending
/* module.exports.actionName = function(req , res){} */ 