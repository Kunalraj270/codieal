const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.home = function (req, res) {
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

    // Populate the user of each post
   Post.find({}).populate('user').exec(function(err , posts){
       if(err){
           console.log('Error in fetching the post of the user')
       }
      return res.render('home' , {
          title: 'Codieal | home',
          posts : posts
      })
   });

//    Comment.find({}).populate('user').exec(function(err , comments){
//        return res.render('home' , {
//            title : 'codieal | comment',
//            comments : comments
//        })
//    })
}

// pending
/* module.exports.actionName = function(req , res){} */ 