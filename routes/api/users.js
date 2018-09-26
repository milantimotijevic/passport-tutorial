const mongoose = require('mongoose');
const passport = require('passport');
const router = require('express').Router();
const auth = require('../auth');
const Users = mongoose.model('Users');

router.post('/register', auth.optional, function(req, res, next) {
    const user = req.body.user;

    const finalUser = new Users(user);
    finalUser.setPassword(user.password);
    finalUser.save().then(function() {
        res.json({user: finalUser.toAuthJSON()});
    });
    // NOTE :can also 'return' res.send or res.json, in which case it will simply exit the function upon sending the HTTP response; as far as the response itself is concerned it does not matter whether I return the value or just call res.send, res.json etc
});

router.post('/login', auth.optional, function(req, res, next) {
    const user = req.body.user;

    if(!user.email) {
        return res.status(422).json({
            errors: {
                email: 'is required',
            },
        });
    }

    if(!user.password) {
        return res.status(422).json({
            errors: {
                password: 'is required',
            },
        });
    }

    return passport.authenticate('local', {session: false}, function(err, passportUser, info) {
        if(err) throw err; // TODO handle this better, ensure something gets returned
        //if(err) return next(err);

        if(passportUser) {
            const user = passportUser;
            user.token = passportUser.generateJWT();
            return res.json({user: user.toAuthJSON()});
        }

        res.status(400).json({msg: 'You are NOT PREPARED!'});

    })(req, res, next);
});

router.get('/products', auth.required, function(req, res) {
    res.send(['tooth pick', 'cat holder', 'bazooka', 'Frostmourne', 'Florida ballot']);
});

module.exports = router;