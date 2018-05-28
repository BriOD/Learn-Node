const mongoose = require('mongoose');
const Tourney = mongoose.model('Tourney');
const multer = require('multer');  // handles upload requests
const jimp = require('jimp'); // resizes photots
const uuid = require('uuid'); // gives us unique filenames

const multerOptions = {
    storage: multer.memoryStorage(),
    filefilter(req, file, next) {
        const isPhoto = file.mimetype.startsWith('image/');
        if(isPhoto) {
            next(null, true)
        } else {
            next({ message: `That file type isn't allowed!` }, false);
        }
    }
}

exports.homePage = (req, res) => {
    res.render('index');
}

exports.addTourney = (req, res) => {
    res.render('editTourney', { title: 'Add Tourney' });
}

exports.upload = multer(multerOptions).single('photo');

exports.resize = async (req, res, next) => {
    // check to see if there's a new file to resize
    if (!req.file) {
        next();
        return;
    };
    const extension = req.file.mimetype.split('/')[1];
    req.body.photo = `${uuid.v4()}.${extension}`;
    // now resize
    const photo = await jimp.read(req.file.buffer);
    await photo.resize(800, jimp.AUTO);
    await photo.write(`./public/uploads/${req.body.photo}`);
    // once we have written the photo to our filesystem, keep going
    next();
};

exports.createTourney = async (req, res) => {
    const tourney = await (new Tourney(req.body)).save();
    req.flash('success', `Successfully Created ${tourney.venue} $ ${tourney.buyin}.`);
    res.redirect(`/tourney/${tourney._id}`)
};

exports.getTourneys = async (req, res) => {
    // querry db to get list of all tourneys
    const tourneys = await Tourney.find();
    res.render('tourneys', {title: 'Tourneys', tourneys })
};

exports.editTourney = async (req, res) => {
    // 1. Find the store given the id
    const tourney = await Tourney.findOne({ _id: req.params.id })
    // 2. make sure they are the owner of the tourney
    // TODO
    // 3. render out the edit form
    res.render('editTourney', { title: `Edit ${tourney.venue} ${tourney.buyin}`, tourney });
}

exports.updateTourney = async (req, res) => {
    // set the location data to be a point
    req.body.location.type = 'Point';
    // find and update the tourney
    const tourney = await Tourney.findOneAndUpdate({ _id: req.params.id }, req.body, {
        new: true, // return the new tourney instead of the old one
        runValidators: true
    }).exec();
    req.flash('success', `Successfully updated ${tourney.venue} ${tourney.buyin}`)
    // redirect to the tourney and tell them it worked
    res.redirect(`/tourneys`)
}

exports.getTourneyById = async (req, res, next) => {
    const tourney = await Tourney.findOne({ _id: req.params.id });
    if(!tourney) return next();
    res.render('tourney', { tourney, title: tourney.venue })
}