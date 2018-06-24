const passport = require('passport');
const crypto = require('crypto');
const mongoose = require('mongoose');
const promisify = require('es6-promisify');
const User = mongoose.model('User');

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

exports.forgotPassowrd = async (req, res) => {
    // 1. see if email exists
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        req.flash('error', 'No account with that email exists.'); //ask cliff if this is ok.
        return res.redirect('/login');
    }
    // 2. set reset tokens and exirary on account
    user.resetPasswordToken = crypto.randomBytes(20).toString('hex');
    user.resetPasswordExpires = Date.now() + 3600000; //1 hour
    await user.save();
    // 3. send an email with a token
    const resetUrl = `http://${req.headers.host}/account/reset/${user.resetPasswordToken}`;
    req.flash('success', `You have been emailed a password reset link. ${resetUrl}`);
    // 4. redirect to login page
    res.redirect('/login')
};

exports.reset = async (req, res) => {
    const user = User.findOne({
        resetPasswordToken: req.params.token,
        resetPasswordExpires: { $gt: Date.now() } 
    });
    if (!user){
        req.flash('error', 'Reset password failed.');
        return res.redirect('/login');
    }
    res.render('reset', { title: 'Reset Password' });
};

exports.confirmedPasswords = (req, res, next) => {
    if (req.body.password === req.body['password-confirm']) {
        next();
        return;
    }
    req.flash('error', 'Passwords Do Not Match');
    res.redirect('back')
};

exports.update = async (req, res) => {
    const user = await User.findOne({
        resetPasswordToken: req.params.token,
        resetPasswordExpires: { $gt: Date.now() } 
    }); 
    if (!user){
        req.flash('error', 'Reset password failed.');
        return res.redirect('/login');
    }
    const setPassword = promisify(user.setPassword, user);
    await setPassword(req.body.password);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    const updatedUser = await user.save();
    await req.login(updatedUser);
    req.flash('success', 'You reset your password.');
    res.redirect('/')
}


