module.exports.home = function(req , res){
    // return res.end('<h1>Express is up for codieal!!</h1>');
    console.log(req.cookies);
    res.cookie('user_id' , 90);
    return res.render('home' , {
        title : 'Home'
    });
}

// pending
/* module.exports.actionName = function(req , res){} */ 