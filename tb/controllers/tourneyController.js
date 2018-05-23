const mongoose = require('mongoose');
const Tourney = mongoose.model('Tourney');

exports.homePage = (req, res) => {
    res.render('index');
}

exports.addTourney = (req, res) => {
    res.render('editTourney', { title: 'Add Tourney' });
}

exports.createTourney = async (req, res) => {
    const tourney = await (new Tourney(req.body)).save();
    req.flash('success', `Successfully Created ${tourney.venue} $ ${tourney.buyin}.`);
    res.redirect(`/tourney/${tourney._id}`)
};

exports.getTourneys = async (req, res) => {
    // querry db to get list of all tourneys
    const tourneys = await Tourney.find();
    console.log(tourneys);
    res.render('tourneys', {title: 'Tourneys', tourneys })
};