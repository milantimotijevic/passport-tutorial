const mongoose = require('mongoose');
const passport = require('passport');
const router = require('express').Router();
const auth = require('../auth');
const Users = mongoose.model('Users');

router.post('/register', auth.optional, function(req, res, next) {
    const user = req.body.user;

    //can also 'return' below line, in which case it will simply exit the function upon sending the HTTP response; as far as the response itself is concerned it does not matter whether I return the value or just call res.send, res.json etc
    res.status(200).json({name: 'pera peric'});
});

router.post('/login', auth.optional, function(req, res, next) {
    const user = req.body.user;

    return passport.authenticate('local', {session: false}, function(err, passportUser, info) {
        const user = passportUser;
        user.token = passportUser.generateJWT();
        res.json({user: user.toAuthJSON()});
    })(req, res, next);
});

module.exports = router;