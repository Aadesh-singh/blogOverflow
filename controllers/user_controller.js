const User = require('../models/user');
const bcrypt = require('bcrypt');

module.exports.profile = function(req, res){
    return res.render('profile', {
        title: 'Profile'
    });
}

module.exports.create = async function(req, res){
    try {
        if(req.body.password !== req.body.cfpassword){
            console.log('Password dont match');
            return res.redirect('back');
        }
        let user = await User.findOne({email: req.body.email});
        if(user){
            console.log('User already exist, signIn instead');
            return res.status(401);
        } else {
            // encrypt password using bcrypt
            const salt = await bcrypt.genSalt(10);                      
            const hash = await bcrypt.hash(req.body.password, salt)
            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: hash
            });
            console.log(user);
            return res.redirect('/user/sign-in');
        }
    } catch (error) {
        console.log('Error in signing up', error);
        return res.redirect('back');
    }
}

module.exports.createSession = function(req, res){
    console.log('Signed in successfully req.user', req.user);
    return res.redirect('/');
}

module.exports.signIn = function(req, res){
    return res.render('signin', {
        title: 'Sign In'
    });
}
module.exports.signUp = function(req, res){
    return res.render('signup', {
        title: 'Sign Up'
    });
}

module.exports.destroySession = function(req, res){
    req.logout();
    console.log('Logged Out successfully');
    return res.redirect('/');
}

