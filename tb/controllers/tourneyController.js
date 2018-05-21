exports.homePage = (req, res) => {
    res.render('index');
}

exports.addTourney = (req, res) => {
    res.render('editTourney', { title: 'Add Tourney' });
}