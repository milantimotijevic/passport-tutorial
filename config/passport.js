const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local');

const Users = mongoose.model('Users');

// supplanting mongoose's real fetch function in order to be able to mock DB
Users.findOne = function(params) {
    return new Promise(function(resolve, reject) {
        resolve({
            email: params.email,
            id: 1,
            name: 'Pera Peric'
        });
    });
};

passport.use(new LocalStrategy({
    usernameField: 'user[email]',
    passwordField: 'user[password]'
}, function(email, password, done) {
    Users.findOne({email})
        .then(function(user) {
            if(!user || !user.validatePassword(password)) {
                return done(null, false, {errors: {'email or password': 'is invalid'}});
            }

            return done(null, user);
        }).catch(done);
}));