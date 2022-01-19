module.exports.home = function(req , res){
    // return res.end('<h1>Express is up for codieal!!</h1>');
    return res.render('home' , {
        title : 'Home'
    });
}

// pending
/* module.exports.actionName = function(req , res){} */ 