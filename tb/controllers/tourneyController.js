const mongoose = require('mongoose');
const Tourney = mongoose.model('Tourney');

exports.homePage = (req, res) => {
    res.render('index');
}

exports.addTourney = (req, res) => {
    res.render('editTourney', { title: 'Add Tourney' });
}

exports.createTourney = async (req, res) => {
    const tourney = new Tourney(req.body);
    await tourney.save();
    req.flash();
    res.redirect('/')
};