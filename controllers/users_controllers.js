//export model user
const User = require('../models/user');

module.exports.profile = async function (req, res) {
    // return res.end('<h1>Users Profile</h1>');
    User.findById(req.params.id , function(err , user){
        return res.render('user_profile', {
            title: 'Profile',
            profile_user : user
        });
    });
}

//Update controller
module.exports.update = function(req , res){
    if(req.user.id == req.params.id){
        User.findByIdAndUpdate(req.params.id , req.body , function (err) {
            return res.redirect('back');
        });
    }else{
        res.redirect(401).send('Unathourized');
    }
}


// pending
/* module.exports.actionName = function(req , res){} */


//render the Sign Up page
module.exports.signUp = function (req, res) {
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_up', {
        title: "Codieal | Sign Up"
    });
}

//Render the Sign In page
module.exports.singIn = function (req, res) {
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_in', {
        title: "Codieal | Sign In"
    });
}

//get the sign up data
module.exports.create = function (req, res) {
    if (req.body.password != req.body.Confirm_password) {
        // console.log(req.body);
        return res.redirect('back');
    }

    User.findOne({email : req.body.email}, function(err , user){
        if(err){
            console.log('error in finding user in siging up');
            return;
        }
        if(!user){
            User.create(req.body , function(err , user){
                if(err){
                    console.log('error in creating user while sigining up');
                    return;
                }else{
                    return res.redirect('/users/sign-in');
                }
            })
        }else{
            return res.redirect('back');
        }
    });
 }

//sign in and create the session for the users
module.exports.createSession = function (req, res) {
   return res.redirect('/');
}

module.exports.distroySession = function(req , res){
    req.logout();
    return res.redirect('/');
}