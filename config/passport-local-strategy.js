const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const bcrypt = require('bcrypt');

passport.use(new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true
    },
    function(req, email, password, done){
        User.findOne({email: email}, function(err, user){
            if(err){
                console.log('Error in finding user: ', err);
                return done(err);
            }

            bcrypt.compare(password, user.password, function(err, result){
                if(err){
                    console.log('Error in vaidating password: ', err);
                    return done(err);
                }
                if(!result){
                    console.log('Invalid username/password');
                    return done(null, false);
                }
                return done(null, user);
            });
        });
    }
));

// serializing the user
passport.serializeUser(function(user, done){
    done(null, user.id);
});

passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        if(err){
            console.log('Error in finding user', err);
            return done(err);
        }
        return done(null, user);
    });
});

passport.checkAuthentication = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect('/user/sign-in');
}

passport.setAuthenticatedUser = function(req, res, next){
    if(req.isAuthenticated){
        res.locals.user = req.user;
    }
    next();
}

passport.checkUnAuthentication = function(req, res, next){
    if(!req.isAuthenticated()){
        return next();
    }
    return res.redirect('/');
}

module.exports = passport;

