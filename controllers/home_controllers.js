const Post = require('../models/post');

module.exports.home = function (req, res) {
    // return res.end('<h1>Express is up for codieal!!</h1>');
    // console.log(req.cookies);
    // res.cookie('user_id', 1);


    Post.find({}, function (err, posts) {
        if (err) {
            console.log('Error fetching contact from db');
            return;
        }

        return res.render('home', {
            title: 'Codieal | Home',
            posts: posts
        });

    });


}

// pending
/* module.exports.actionName = function(req , res){} */ 