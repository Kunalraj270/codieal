//export model user
const User = require('../models/user');

module.exports.profile = async function (req, res) {
    // return res.end('<h1>Users Profile</h1>');
    User.findById(req.params.id, function (err, user) {
        return res.render('user_profile', {
            title: 'Profile',
            profile_user: user
        });
    });
}

//Update controller
module.exports.update = async function (req, res) {
    // if(req.user.id == req.params.id){
    //     User.findByIdAndUpdate(req.params.id , req.body , function (err) {
    //         return res.redirect('back');
    //     });
    // }else{
    // req.flash('error' ,'Unathourized')
    //     res.redirect(401).send('Unathourized');
    // }

    if (req.user.id == req.params.id) {
        try {
            let user = await User.findById(req.params.id);
            User.uploadedAvatar(req , res , function(err) {
                if (err) {
                    console.log('*****multer error', err);
                }
                console.log(req.file);

                user.name = req.body.name;
                user.email  = req.body.email;

                if(req.file){
                    // this is saving the path of the uploaded path into the avatar field in users
                    user.avatar = User.avatarPath + '/' + req.file.filename;
                }
                user.save();
                return res.redirect('back');
            });
        } catch (error) {
            req.flash('error', err);
            return res.redirect('back');
        }
    } else {
        req.flash('error', 'Unathourized')
        res.redirect(401).send('Unathourized');
    }
}


// pending
/* module.exports.actionName = function(req , res){} */


//render the Sign Up page
module.exports.signUp = function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_up', {
        title: "Codieal | Sign Up"
    });
}

//Render the Sign In page
module.exports.singIn = function (req, res) {
    if (req.isAuthenticated()) {
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

    User.findOne({ email: req.body.email }, function (err, user) {
        if (err) {
            console.log('error in finding user in siging up');
            return;
        }
        if (!user) {
            User.create(req.body, function (err, user) {
                if (err) {
                    console.log('error in creating user while sigining up');
                    return;
                } else {
                    return res.redirect('/users/sign-in');
                }
            })
        } else {
            return res.redirect('back');
        }
    });
}

//sign in and create the session for the users
module.exports.createSession = function (req, res) {
    req.flash('success', 'Logged in Successfully!');
    return res.redirect('/');
}

module.exports.distroySession = function (req, res) {
    req.logout();
    req.flash('success', 'You have logged out!');
    return res.redirect('/');
}