const express = require('express');
const router = express.Router();
// const passport = require('../config/passport-local-strategy');
const passport = require('passport');
const userController = require('../controllers/user_controller');

router.post('/create', userController.create);

router.post('/create-session', 
    passport.authenticate(
        'local',
        {failureRedirect: '/user/sign-in'}
    ),
    userController.createSession
);

router.get('/destroy-session', passport.checkAuthentication, userController.destroySession);

router.get('/sign-in', passport.checkUnAuthentication, userController.signIn);
router.get('/sign-up', passport.checkUnAuthentication, userController.signUp);

router.get('/profile', passport.checkAuthentication, userController.profile);

module.exports = router;