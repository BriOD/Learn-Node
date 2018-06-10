const passport = require('passport');

exports.login = passport.authenticate('local', {
    failureRedirect: '/login',
    failureFlash: 'Failed Login.',
    successRedirect: '/',
    successFlash: 'Now logged In.'
});

exports.logout = (req, res) => {
    req.logout();
    req.flash('success', 'You have successfully logged out!');
    res.redirect('/');
};

exports.isLoggedIn = (req, res, next) => {
    //first check if user is authenticated
    if(req.isAuthenticated()) {
        next();
        return;
    }
    req.flash('error', 'You Must Be Logged In!');
    res.redirect('/login');
};

