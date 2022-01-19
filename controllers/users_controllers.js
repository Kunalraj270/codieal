module.exports.profile = function(req , res){
    // return res.end('<h1>Users Profile</h1>');
    return res.render('profile', {
        title : 'Profile'
    });
}

// pending
/* module.exports.actionName = function(req , res){} */ 